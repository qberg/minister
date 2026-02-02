import { s3Storage } from "@payloadcms/storage-s3";
import { env } from "env";

export const s3Adapter = s3Storage({
  collections: {
    media: {
      generateFileURL: ({ filename }) => `${env.CLOUDFRONT_URL}/${filename}`,
    },
  },
  bucket: env.S3_BUCKET,
  config: {
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    region: env.S3_REGION,
  },
});
