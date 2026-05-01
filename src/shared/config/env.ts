import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_SECRET_KEY: z.string().min(1).startsWith("sb_secret_"),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
