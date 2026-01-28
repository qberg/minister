import configPromise from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

export async function GET() {
  const payload = await getPayload({ config: configPromise });
  await payload.find({ collection: "users", limit: 1 });

  return NextResponse.json({ status: "ok", timestamp: Date.now() });
}
