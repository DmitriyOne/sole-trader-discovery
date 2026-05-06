import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { responseSchema } from "@/entities/response";
import { insertResponse } from "@/entities/response/api/insertResponse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LOG_LEN = 200;

function truncate(value: unknown, max = MAX_LOG_LEN): string {
  const str =
    value instanceof Error
      ? `${value.name}: ${value.message}`
      : typeof value === "string"
        ? value
        : JSON.stringify(value);
  if (typeof str !== "string") return String(value).slice(0, max);
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch (err) {
    console.error("[submit] invalid JSON body:", truncate(err));
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Server-side validation — never trust client
  let validated;
  try {
    validated = responseSchema.parse(payload);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(
        "[submit] validation failed:",
        err.flatten().fieldErrors,
        "payload:",
        truncate(payload, 2000)
      );
      return NextResponse.json(
        { error: "Validation failed" },
        { status: 422 }
      );
    }
    console.error("[submit] unknown validation error:", truncate(err));
    return NextResponse.json(
      { error: "Unknown validation error" },
      { status: 400 }
    );
  }

  // Insert into Supabase
  try {
    const inserted = await insertResponse(validated);
    return NextResponse.json({ id: inserted.id }, { status: 201 });
  } catch (err) {
    console.error("[submit] insert error:", err);
    return NextResponse.json(
      { error: "Could not save response. Please try again." },
      { status: 500 }
    );
  }
}
