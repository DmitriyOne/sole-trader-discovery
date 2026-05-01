import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { responseSchema, insertResponse } from "@/entities/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
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
      return NextResponse.json(
        {
          error: "Validation failed",
          details: err.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }
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
    console.error("Insert error:", err);
    return NextResponse.json(
      { error: "Could not save response. Please try again." },
      { status: 500 }
    );
  }
}
