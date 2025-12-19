"use server";

import type { CollectionSlug, TypedLocale } from "payload";
import { getLatestUpdates } from "@/lib/queries/latest-updates";

type FetchLatestUpdatesParams = {
  locale: TypedLocale;
  collection: CollectionSlug;
  tag?: string;
  page: number;
  limit: number;
};

export async function fetchLatestUpdatesAction({
  locale,
  collection,
  tag,
  page,
  limit,
}: FetchLatestUpdatesParams) {
  return await getLatestUpdates({
    locale,
    collection,
    tag,
    page,
    limit,
  });
}
