import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_SECRET_KEY: z.string().min(1).startsWith("sb_secret_"),
    // Required. Vercel cron attaches `Authorization: Bearer <CRON_SECRET>`
    // automatically; /api/health verifies it. The app refuses to boot if
    // this is missing — same posture as SUPABASE_SECRET_KEY.
    CRON_SECRET: z.string().min(16),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
