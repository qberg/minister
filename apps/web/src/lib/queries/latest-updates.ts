import {
  getPayload,
  type Where,
  type CollectionSlug,
  type TypedLocale,
} from "payload";
import config from "@payload-config";
import type {
  LatestUpdateItem,
  MediaPreview,
  SelectedCollectionFields,
} from "@/types";

function mapToLatestUpdateItem(
  doc: SelectedCollectionFields,
): LatestUpdateItem {
  return {
    id: doc.id,
    title: doc.title,
    publishedDate: doc.publishedDate,
    image: doc.image
      ? ({
          url: doc.image.url,
          alt: doc.image.alt,
          blurUrl: doc.image.sizes?.blur?.url,
        } as MediaPreview)
      : null,
    tags: doc.tags
      ? {
          slug: doc.tags.slug,
          label: doc.tags.label,
        }
      : null,
    newspaper: doc.newspaper,
    externalLink: doc.externalLink,
  };
}

export type GetLatestUpdatesParams = {
  locale: TypedLocale;
  collection: CollectionSlug;
  tag?: string;
  page: number;
  limit: number;
};

export type LatestUpdatesResult = {
  docs: LatestUpdateItem[];
  hasNextPage: boolean;
  page: number;
  totalPages: number;
};

export async function getLatestUpdates(
  params: GetLatestUpdatesParams,
): Promise<LatestUpdatesResult> {
  const { locale, collection, tag, page, limit } = params;

  const payload = await getPayload({ config });

  const where: Where =
    tag && tag !== "all" ? { "tags.slug": { equals: tag } } : {};

  const result = await payload.find({
    collection: collection as CollectionSlug,
    where,
    limit,
    page,
    locale,
    sort: "-publishedDate",
    depth: 1,
    select: {
      title: true,
      publishedDate: true,
      image: true,
      tags: true,
      externalLink: true,
    },
  });

  return {
    docs: (result.docs as SelectedCollectionFields[]).map(
      mapToLatestUpdateItem,
    ),
    hasNextPage: result.hasNextPage,
    page: result.page || 0,
    totalPages: result.totalPages,
  };
}
