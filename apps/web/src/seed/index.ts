import configPromise from "@payload-config";
import { getPayload, type Payload } from "payload";
import { seedActivities } from "./activities";

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info("— Seeding database...");

  await seedActivities(payload);

  payload.logger.info("— Seed Complete.");
};

async function run() {
  try {
    const payload = await getPayload({ config: configPromise });

    await seed(payload);
  } catch (error) {
    // biome-ignore lint: for errors
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

await run();
