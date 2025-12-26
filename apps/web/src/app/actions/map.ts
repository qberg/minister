"use server";

import config from "@payload-config";
import { getPayload, type TypedLocale } from "payload";
import type { MapZoneOption } from "@/types";

export async function getMapZones(
  locale: TypedLocale
): Promise<MapZoneOption[]> {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "map-zones",
      limit: 300,
      sort: "name",
      locale,
      select: {
        name: true,
        slug: true,
        type: true,
      },
    });

    return result.docs.map((doc) => ({
      name: doc.name,
      slug: doc.slug,
      type: doc.type,
    }));
  } catch (error) {
    // biome-ignore lint: needed for debugging
    console.error(`Error fetching map zones for locale ${locale}:`, error);
    return [];
  }
}
