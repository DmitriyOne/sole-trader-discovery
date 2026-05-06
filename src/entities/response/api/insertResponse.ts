import "server-only";

import { getSupabaseAdmin } from "@/shared/api/supabase";
import type { TResponseInput } from "@/entities/response/model/schema";
import { PRIVACY_NOTICE_VERSION } from "@/shared/config/text";

const TABLE_NAME = "responses";

export async function insertResponse(payload: TResponseInput) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      ...payload,
      consent_at: new Date().toISOString(),
      notice_version: PRIVACY_NOTICE_VERSION,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${JSON.stringify(error)}`);
  }

  return data;
}
