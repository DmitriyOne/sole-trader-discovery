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
    .min(1, "Email is required")
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email("That doesn't look like a valid email")),
  business: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(2, "One line is enough")
        .max(200, "Keep it short")
    ),
  tenure: z.enum(TENURE_VALUES, {
    errorMap: () => ({ message: "Pick one" }),
  }),

  // Mom Test questions — open-ended, demand specifics
  q1_admin_task: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(20, "Give me a real answer — at least a sentence or two")
        .max(2000)
    ),
  q2_currently_paying: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(10, "Even one line works — what tools / who do you pay")
        .max(2000)
    ),
  q3_magic_wand: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(15, "This is the most important question — give me something real")
        .max(2000)
    ),

  // GDPR consent — must be true to submit
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please confirm you've read the privacy notice",
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
