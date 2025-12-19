import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import payloadLocalization from "@repo/i18n/payload";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { Header } from "./header/config";
import { s3Adapter } from "./storage/s3";
import { Tags } from "./collections/Tags";
import { NewspaperFeatuers } from "./collections/NewspaperFeatures";
import { Articles } from "./collections/Articles";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Laptop",
          name: "laptop",
          width: 1280,
          height: 610,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1536,
          height: 864,
        },
      ],
    },
  },
  localization: payloadLocalization,
  collections: [Users, Media, Pages, Articles, NewspaperFeatuers, Tags],
  globals: [Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [s3Adapter],
});
