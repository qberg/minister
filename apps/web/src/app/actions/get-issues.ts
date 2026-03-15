"use server";

import config from "@payload-config";
import type { TypedLocale } from "payload";
import { getPayload } from "payload";

export type IssueOption = {
  id: number;
  name: string;
  slug: string;
};

export async function getIssues(locale: TypedLocale): Promise<IssueOption[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "issues",
    locale,
    depth: 0,
    limit: 100,
    pagination: false,
    sort: "name",
    select: {
      name: true,
      slug: true,
    },
  });

  return result.docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    slug: doc.slug as string,
  }));
}
