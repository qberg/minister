import { unstable_cache } from "next/cache";
import { getPayload, type TypedLocale } from "payload";
import configPromise from "@/payload.config";
import type { Config } from "@/payload-types";

type Global = keyof Config["globals"];

async function getGlobal<T extends Global>(
  slug: T,
  locale: TypedLocale,
  depth = 0
) {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  });
  return global as Config["globals"][T];
}

export const getCachedGlobal = <T extends Global>(
  slug: T,
  locale: TypedLocale = "en",
  depth = 0
) =>
  unstable_cache(
    async () => getGlobal(slug, locale, depth),
    [slug, locale, String(depth)],
    {
      tags: [`global_${slug}`],
    }
  );
