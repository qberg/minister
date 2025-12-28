import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import type { Payload } from "payload";

const BATCH_SIZE = 100;
const DELETE_BATCH_SIZE = 25;

type ActivityCSVRow = {
  "S.No": string;
  "Panchayat Name": string;
  "Scheme Name": string;
  Year: string;
  "Work Type": string;
  "Work Name": string;
  "AS Mount": string;
};

const parseCost = (costStr: string): number => {
  if (!costStr) {
    return 0;
  }
  return Number.parseFloat(costStr.replace(/,/g, ""));
};

const resolveIssueSlug = (rawType: string, rawTitle: string): string => {
  const text = `${rawType} ${rawTitle}`.toLowerCase();

  if (text.includes("road") || text.includes("pavement")) {
    return "roads";
  }

  if (
    text.includes("water") ||
    text.includes("oht") ||
    text.includes("borewell") ||
    text.includes("pipeline") ||
    text.includes("osmosis") ||
    text.includes("tank")
  ) {
    return "water-supply";
  }

  if (
    text.includes("drain") ||
    text.includes("culvert") ||
    text.includes("soak") ||
    text.includes("canal")
  ) {
    return "drainage-sewage";
  }

  if (
    text.includes("school") ||
    text.includes("class") ||
    text.includes("education") ||
    text.includes("anganwadi")
  ) {
    return "education";
  }

  if (
    text.includes("toilet") ||
    text.includes("sanitary") ||
    text.includes("latrine")
  ) {
    return "toilets";
  }

  if (
    text.includes("park") ||
    text.includes("green") ||
    text.includes("plantation") ||
    text.includes("nursery") ||
    text.includes("tree")
  ) {
    return "parks-greenery";
  }

  if (
    text.includes("house") ||
    text.includes("pmay") ||
    text.includes("kki") ||
    text.includes("hut")
  ) {
    return "housing";
  }

  // Default catch-all for PDS, Libraries, Burial Grounds, etc.
  return "public-facilities";
};

const clearExistingActivities = async (payload: Payload) => {
  payload.logger.info("--Checking for existing activities...");

  while (true) {
    const existingDocs = await payload.find({
      collection: "activities",
      limit: DELETE_BATCH_SIZE,
      depth: 0,
    });

    if (existingDocs.totalDocs === 0) {
      break;
    }

    const idsToDelete = existingDocs.docs.map((doc) => doc.id);

    payload.logger.info(
      `— Deleting batch of ${idsToDelete.length} activities... (${existingDocs.totalDocs} remaining)`
    );

    await payload.delete({
      collection: "activities",
      where: {
        id: { in: idsToDelete },
      },
    });
  }

  payload.logger.info("— Database Cleared.");
};

export const seedActivities = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding activities from csv...");
  const csvPath = path.resolve(process.cwd(), "src/seed/activities.csv");
  payload.logger.info(`CSV Path Given: ${csvPath}`);

  if (!fs.existsSync(csvPath)) {
    payload.logger.error(`CSV File not found at ${csvPath}`);
  }

  await clearExistingActivities(payload);

  payload.logger.info("-- Reading CSV...");
  const fileContent = fs.readFileSync(csvPath, "utf8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as ActivityCSVRow[];

  payload.logger.info(`Total records parsed: ${records.length}`);
  payload.logger.info("Sample records (first 2 rows):");
  //payload.logger.info(JSON.stringify(records.slice(0, 2), null, 2));

  payload.logger.info("-- Read Complete");

  payload.logger.info("—- Fetching Zones and Issues for lookup...");
  const allZones = await payload.find({
    collection: "map-zones",
    limit: 100,
    pagination: false,
  });
  const allIssues = await payload.find({
    collection: "issues",
    limit: 100,
    pagination: false,
  });

  const zoneMap = new Map(
    allZones.docs.map((doc) => [doc.name.toLowerCase().trim(), doc.id])
  );
  const issueSlugMap = new Map(allIssues.docs.map((doc) => [doc.slug, doc.id]));

  payload.logger.info(`zoneMap size: ${zoneMap.size}`);
  payload.logger.info(`issueSlugMap size: ${issueSlugMap.size}`);

  //payload.logger.info(JSON.stringify(Object.fromEntries(zoneMap), null, 2));
  //payload.logger.info( JSON.stringify(Object.fromEntries(issueSlugMap), null, 2));

  payload.logger.info(
    `— Processing ${records.length} records in batches of ${BATCH_SIZE}...`
  );

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    // biome-ignore lint: need for evolving promises
    const promises = [];

    for (const row of batch) {
      const title = row["Work Name"];
      const panchayatName = row["Panchayat Name"];

      const zoneId = zoneMap.get(panchayatName.toLowerCase().trim());

      if (!zoneId) {
        payload.logger.error(`Skipped: Zone not found "${panchayatName}"`);
        totalErrors++;
      }

      const targetSlug = resolveIssueSlug(row["Work Type"], row["Work Name"]);
      const issueId = issueSlugMap.get(targetSlug);
      if (!issueId) {
        totalErrors++;
      }

      const operation = async () => {
        const existing = await payload.find({
          collection: "activities",
          where: {
            title: {
              equals: true,
            },
          },
        });

        if (existing.docs.length > 0) {
          totalSkipped++;
          return;
        }

        await payload.create({
          collection: "activities",
          data: {
            title,
            cost: parseCost(row["AS Mount"]),
            scheme: row["Scheme Name"],
            // biome-ignore lint: need for evolving promises
            financialYear: row["Year"],
            status: "completed",
            zone: zoneId,
            type: issueId,
          },
        });

        totalCreated++;
      };

      promises.push(operation());
    }

    await Promise.all(promises);
    payload.logger.info(
      `-- Batch complete: processed ${i + promises.length} / ${records.length}`
    );
  }
  payload.logger.info(`Created: ${totalCreated}`);
  payload.logger.info(`Skipped: ${totalSkipped}`);
  payload.logger.info(`Errors (Missing relations): ${totalErrors}`);
};
