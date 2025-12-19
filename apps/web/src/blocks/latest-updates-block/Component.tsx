import type { CollectionSlug, TypedLocale } from "payload";
import LatestUpdatesClient from "./Component.client";
import { getLatestUpdates } from "@/lib/queries/latest-updates";
import { getTags } from "@/lib/queries/tags";
import type { LatestUpdatesBlockType } from "@/types";

type Props = {
  locale: TypedLocale;
  block: LatestUpdatesBlockType;
};

export async function LatestUpdatesBlock({ locale, block }: Props) {
  const [initialData, tags] = await Promise.all([
    getLatestUpdates({
      locale,
      collection: block.defType as CollectionSlug,
      page: 1,
      limit: block.perPage,
    }),
    block.showTags ? getTags({ locale }) : Promise.resolve([]),
  ]);

  return (
    <LatestUpdatesClient block={block} tags={tags} initialData={initialData} />
  );
}
