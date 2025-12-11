import type { PayloadRequest, CollectionSlug } from "payload";

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: "",
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (slug === undefined || slug === null) {
    return null;
  }

  const locale = req.locale;
  const defaultLocale = "ta-IN";

  const encodedSlug = encodeURIComponent(slug);

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`.replace(
      /\/+/g,
      "/",
    ),
    previewSecret: process.env.PREVIEW_SECRET || "",
  });

  if (locale && locale !== defaultLocale) {
    encodedParams.append("locale", locale);
  }

  const url = `/api/preview?${encodedParams.toString()}`;
  return url;
};
