import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/shared/config/env";
import { getSupabaseAdmin } from "@/shared/api/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE_NAME = "responses";

// Constant-time string compare. We hash both sides to fixed-length
// SHA-256 digests so timingSafeEqual always operates on equal-length
// buffers — that hides even the LENGTH of the incoming header.
function safeEqual(a: string, b: string): boolean {
  const aHash = createHash("sha256").update(a).digest();
  const bHash = createHash("sha256").update(b).digest();
  return timingSafeEqual(aHash, bHash);
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${env.CRON_SECRET}`;

  if (!safeEqual(auth, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Lightweight DB touch. `head: true` skips returning rows;
  // Supabase still executes a count query, which counts as activity
  // and resets the free-tier 7-day inactivity timer.
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(TABLE_NAME)
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("[health] supabase ping failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const ts = new Date().toISOString();

  console.log(`[health] pinged Supabase at ${ts} (ok)`);

  return NextResponse.json({
    ok: true,
    ts,
  });
}
