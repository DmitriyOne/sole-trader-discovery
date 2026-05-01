import { getSupabaseAdmin } from "@/shared/api/supabase";
import type { TResponseInput } from "@/entities/response/model/schema";
import { PRIVACY_NOTICE_VERSION } from "@/shared/config/text";

const TABLE_NAME = "responses";

export async function insertResponse(payload: TResponseInput) {
  const supabase = getSupabaseAdmin();

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      ...payload,
      // Persist when consent was given (regulatory requirement)
      consent_at: now,
      submitted_at: now,
      // Stamp the privacy notice version the subject agreed to.
      // Server-side only — never trust the client to set this.
      notice_version: PRIVACY_NOTICE_VERSION,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return data;
}
