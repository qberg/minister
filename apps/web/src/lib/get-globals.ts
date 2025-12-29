import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import type { Config } from "@/payload-types";

type Global = keyof Config["globals"];

async function getGlobal<T extends Global>(slug: T, depth = 0) {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    depth,
  });
  return global as Config["globals"][T];
}

export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  });
