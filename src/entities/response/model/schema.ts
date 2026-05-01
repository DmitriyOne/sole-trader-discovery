import { z } from "zod";

/**
 * Single source of truth for the survey response shape.
 * Used by:
 *   - client form (react-hook-form + zodResolver)
 *   - API route (server-side validation)
 *   - Supabase insert payload
 */

export const TENURE_OPTIONS = [
  { value: "under-1y", label: "Less than a year" },
  { value: "1-3y", label: "1–3 years" },
  { value: "3-5y", label: "3–5 years" },
  { value: "5y-plus", label: "5+ years" },
] as const;

export type TTenure = (typeof TENURE_OPTIONS)[number]["value"];

export const responseSchema = z.object({
  // Contact + context (asked first as easy warm-up)
  email: z
    .string()
    .min(1, "Email is required")
    .email("That doesn't look like a valid email"),
  business: z
    .string()
    .min(2, "One line is enough")
    .max(200, "Keep it short"),
  tenure: z.enum(["under-1y", "1-3y", "3-5y", "5y-plus"], {
    errorMap: () => ({ message: "Pick one" }),
  }),

  // Mom Test questions — open-ended, demand specifics
  q1_typical_week: z
    .string()
    .min(20, "Give me a real answer — at least a sentence or two")
    .max(2000),
  q2_last_stress_day: z
    .string()
    .min(20, "Give me a real answer — at least a sentence or two")
    .max(2000),
  q3_uk_bureaucracy: z
    .string()
    .min(20, "Give me a real answer — at least a sentence or two")
    .max(2000),
  q4_what_costs_most: z
    .string()
    .min(10, "Even one line works — just be specific")
    .max(2000),
  q5_currently_paying: z
    .string()
    .min(10, "Even one line works — what tools / who do you pay")
    .max(2000),
  q6_magic_wand: z
    .string()
    .min(15, "This is the most important question — give me something real")
    .max(2000),
  q7_referrals: z.string().max(2000).optional().or(z.literal("")),

  // GDPR consent — must be true to submit
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please confirm you've read the privacy notice",
    }),
  }),
});

export type TResponseInput = z.infer<typeof responseSchema>;

/**
 * Step definitions — order, fields, presentation metadata.
 * Survey-flow widget reads this to render multi-step UI.
 */
export type TStep = {
  id: string;
  title: string;
  fields: ReadonlyArray<keyof TResponseInput>;
};

export const SURVEY_STEPS: ReadonlyArray<TStep> = [
  {
    id: "intro",
    title: "About you",
    fields: ["email", "business", "tenure"],
  },
  {
    id: "q1",
    title: "Your week",
    fields: ["q1_typical_week"],
  },
  {
    id: "q2",
    title: "Last stress day",
    fields: ["q2_last_stress_day"],
  },
  {
    id: "q3",
    title: "UK bureaucracy",
    fields: ["q3_uk_bureaucracy"],
  },
  {
    id: "q4",
    title: "What annoys most",
    fields: ["q4_what_costs_most"],
  },
  {
    id: "q5",
    title: "Current spending",
    fields: ["q5_currently_paying"],
  },
  {
    id: "q6",
    title: "Magic wand",
    fields: ["q6_magic_wand"],
  },
  {
    id: "q7",
    title: "Last bits",
    fields: ["q7_referrals", "consent"],
  },
] as const;
