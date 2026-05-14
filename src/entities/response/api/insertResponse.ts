import "server-only";

import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/shared/api/supabase";
import type { TResponseInput } from "@/entities/response/model/schema";
import { PRIVACY_NOTICE_VERSION } from "@/shared/config/legal-meta";
import { routing, type TLocale } from "@/i18n/routing";

const TABLE_NAME = "responses";

export async function insertResponse(payload: TResponseInput) {
  const supabase = getSupabaseAdmin();

  const reqHeaders = await headers();
  const headerLocale = reqHeaders.get("x-next-intl-locale");
  const language: TLocale = (
    routing.locales as readonly string[]
  ).includes(headerLocale ?? "")
    ? (headerLocale as TLocale)
    : routing.defaultLocale;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      ...payload,
      consent_at: new Date().toISOString(),
      notice_version: PRIVACY_NOTICE_VERSION,
      language,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${JSON.stringify(error)}`);
  }

  return data;
}
