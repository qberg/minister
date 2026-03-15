"use server";

import config from "@payload-config";
import { getPayload, type Where } from "payload";
import type { Activity, Issue, MapZone } from "@/payload-types";

export type PopulatedActivity = Omit<Activity, "type" | "zone"> & {
  type: Issue | null;
  zone: MapZone | null;
};

export type GetActivitiesParams = {
  zone?: string | null;
  type?: string | null;
  sort?: string;
  page?: number;
  limit?: number;
};

export type ActivitiesResult = {
  docs: PopulatedActivity[];
  totalDocs: number;
  totalPages: number;
  page: number;
};

export async function getActivities({
  zone,
  type,
  sort = "-financialYear",
  page = 1,
  limit = 10,
}: GetActivitiesParams): Promise<ActivitiesResult> {
  const payload = await getPayload({ config });

  const where: Where = {};

  if (zone) {
    where["zone.slug"] = { equals: zone };
  }
  if (type) {
    where["type.slug"] = { equals: type };
  }

  const result = await payload.find({
    collection: "activities",
    depth: 1,
    where,
    sort,
    page,
    limit,
  });

  return {
    docs: result.docs as PopulatedActivity[],
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page ?? 1,
  };
}
