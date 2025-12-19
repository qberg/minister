import type { TagPreview } from "@/types";
import { getPayload, type TypedLocale } from "payload";
import config from "@payload-config";

type GetTagsParams = {
  locale: TypedLocale;
};

export async function getTags(params: GetTagsParams): Promise<TagPreview[]> {
  const { locale } = params;

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "tags",
    limit: 10,
    sort: "order",
    locale,
    select: {
      label: true,
      slug: true,
    },
  });

  return result.docs;
}
