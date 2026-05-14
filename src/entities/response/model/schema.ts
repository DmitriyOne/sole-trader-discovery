import { z } from "zod";

/**
 * Single source of truth for the survey response shape.
 * Used by:
 *   - client form (react-hook-form + zodResolver)
 *   - API route (server-side validation)
 *   - Supabase insert payload
 */

export const TENURE_VALUES = [
  "under-1y",
  "1-3y",
  "3-5y",
  "5y-plus",
] as const;

export type TTenure = (typeof TENURE_VALUES)[number];

export const responseSchema = z.object({
  // Contact + context (asked first as easy warm-up)
  // .trim() + .toLowerCase() before .email() so DSAR-by-email
  // lookups stay deterministic regardless of input casing/whitespace.
  email: z
    .string()
    .min(1, "email_required")
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email("email_invalid")),
  business: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(2, "business_too_short")
        .max(200, "business_too_long")
    ),
  tenure: z.enum(TENURE_VALUES, {
    errorMap: () => ({ message: "tenure_required" }),
  }),

  // Mom Test questions — open-ended, demand specifics
  q1_admin_task: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(20, "q1_too_short")
        .max(2000, "q1_too_long")
    ),
  q2_currently_paying: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(10, "q2_too_short")
        .max(2000, "q2_too_long")
    ),
  q3_magic_wand: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(15, "q3_too_short")
        .max(2000, "q3_too_long")
    ),

  // GDPR consent — must be true to submit
  consent: z.literal(true, {
    errorMap: () => ({
      message: "consent_required",
    }),
  }),
});

export type TResponseInput = z.infer<typeof responseSchema>;

/**
 * Step definitions — order and fields only.
 * Step titles live in the dictionary under SurveyPage.steps.<id>.
 * Survey-flow widget reads this to render multi-step UI.
 */
export type TStep = {
  id: string;
  fields: ReadonlyArray<keyof TResponseInput>;
};

export const SURVEY_STEPS: ReadonlyArray<TStep> = [
  {
    id: "intro",
    fields: ["email", "business", "tenure"],
  },
  {
    id: "q1",
    fields: ["q1_admin_task"],
  },
  {
    id: "q2",
    fields: ["q2_currently_paying"],
  },
  {
    id: "q3",
    fields: ["q3_magic_wand", "consent"],
  },
] as const;
