"use server";

import config from "@payload-config";
import { sql } from "@payloadcms/db-postgres/drizzle";
import { getPayload, type Payload, type TypedLocale } from "payload";
import type {
  AllImpactStats,
  IssueCardStat,
  RawImpactAggregateRow,
} from "@/types";

const DEFAULT_LOCALE: TypedLocale = "en";

/**
 * Safely retrieves the Drizzle database instance from Payload
 * @throws Error if database is not available or not using Postgres adapter
 */
function getDrizzleDb(payload: Payload) {
  const db = payload.db?.drizzle;

  if (!db) {
    throw new Error(
      "Drizzle database not available. Ensure Payload is configured with Postgres adapter."
    );
  }

  return db;
}

/**
 * Resolves a zone slug to its database ID
 * @returns The zone ID if found, null otherwise
 */
async function resolveZoneId(
  payload: Payload,
  slug: string
): Promise<number | null> {
  const result = await payload.find({
    collection: "map-zones",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    select: {
      slug: true,
    },
  });

  return result.docs[0]?.id ?? null;
}

/**
 * Processes raw SQL results into structured DashboardStats
 * @param result - Raw result from database query
 */
function processQueryResults(result: unknown): AllImpactStats {
  const rows = ((result as { rows: RawImpactAggregateRow[] }).rows ??
    result) as RawImpactAggregateRow[];

  let totalActivities = 0;
  let totalAmount = 0;

  const issuesBreakdown: IssueCardStat[] = rows.map(
    (row: RawImpactAggregateRow) => {
      // Database returns COUNT and SUM as strings, convert to numbers
      const count = Number(row.activityCount);
      const amount = Number(row.totalAmount);

      totalActivities += count;
      totalAmount += amount;

      const imageSrc = row.iconFilename
        ? `https://d462xg1zgerhx.cloudfront.net/${row.iconFilename}`
        : null;

      return {
        id: String(row.issueId),
        name: row.issueName || "Uncategorized",
        slug: row.issueSlug || "unknown",
        color: row.issueColor || "blue",
        activityCount: count,
        totalAmount: amount,
        imageSrc,
      };
    }
  );

  return {
    totalActivities,
    totalAmount,
    totalIssues: issuesBreakdown.length,
    issuesBreakdown,
  };
}

/**
 * Fetches aggregated statistics from the database
 * @param db - Drizzle database instance
 * @param zoneId - Optional zone ID to filter by (null = all zones)
 */
async function fetchAggregateStats(
  payload: Payload,
  zoneId: number | null
): Promise<AllImpactStats> {
  const db = getDrizzleDb(payload);
  const whereClause = zoneId ? sql`WHERE a.zone_id = ${zoneId}` : sql``;

  const query = sql`
      SELECT 
        i.id as "issueId",
        i.slug as "issueSlug",
        i.color as "issueColor",
        il.name as "issueName",
        MAX(m.filename) as "iconFilename",
        COUNT(a.id) as "activityCount",
        COALESCE(SUM(a.cost), 0) as "totalAmount"
      FROM activities a
      LEFT JOIN issues i
        ON a.type_id = i.id
      LEFT JOIN issues_locales il
        ON i.id = il._parent_id
        AND il._locale = ${DEFAULT_LOCALE}
      LEFT JOIN media m
        ON i.icon_id = m.id
      ${whereClause}
      GROUP BY i.id, i.slug,i.color, il.name
      ORDER BY "totalAmount" DESC
  `;

  const result = await db.execute(query);

  return processQueryResults(result);
}

export async function getMapStats(
  zoneSlug: string | null
): Promise<AllImpactStats> {
  try {
    const payload = await getPayload({ config });

    const zoneId = zoneSlug ? await resolveZoneId(payload, zoneSlug) : null;

    payload.logger.info(`Zone Slug: ${zoneSlug}`);
    payload.logger.info(`Zone Id: ${zoneId}`);

    if (zoneSlug && !zoneId) {
      payload.logger.warn(`Zone not found: ${zoneSlug}`);
      return emptyStats();
    }

    const stats = await fetchAggregateStats(payload, zoneId);

    return stats;
  } catch (_) {
    throw new Error("Failed to fetch impact statistics");
  }
}

function emptyStats(): AllImpactStats {
  return {
    totalActivities: 0,
    totalAmount: 0,
    totalIssues: 0,
    issuesBreakdown: [],
  };
}
