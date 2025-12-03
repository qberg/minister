import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      NODE_ENV: z.enum(["development", "production", "test"]).optional(),
      ANALYZE: z.string().optional(),
      DATABASE_URI: z.url(),
      PAYLOAD_SECRET: z.string().min(8),
      S3_REGION: z.string(),
      S3_BUCKET: z.string(),
      S3_ACCESS_KEY_ID: z.string(),
      S3_SECRET_ACCESS_KEY: z.string(),
      CLOUDFRONT_URL: z.string(),
    },
    client: {
      NEXT_PUBLIC_WEB_URL: z.url(),
    },
    runtimeEnv: {
      DATABASE_URI: process.env.DATABASE_URI,
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
      S3_REGION: process.env.S3_REGION,
      S3_BUCKET: process.env.S3_BUCKET,
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
      CLOUDFRONT_URL: process.env.CLOUDFRONT_URL,
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    },
  });
