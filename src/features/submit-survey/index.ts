"use client";

import type { TResponseInput } from "@/entities/response";
import { API } from "@/shared/config/api";

export type TSubmitResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function submitSurvey(
  payload: TResponseInput,
  locale: string
): Promise<TSubmitResult> {
  try {
    const response = await fetch(API.SUBMIT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-next-intl-locale": locale,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      return {
        ok: false,
        error: errorBody?.error ?? `Request failed (${response.status})`,
      };
    }

    const data = (await response.json()) as { id: string };
    return { ok: true, id: data.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
