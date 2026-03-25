"use server";

import config from "@payload-config";
import { headers } from "next/headers";
import { getPayload } from "payload";
import type { Issue, MapZone } from "@/payload-types";

export type SurveySubmitResult = {
  success: boolean;
  message: string;
  submissionId?: string | number;
};

export async function submitSurveyAction(data: {
  mobile: string;
  name: string;
  mapZoneId: number | MapZone | undefined;
  visionCategoryId: number | Issue | undefined;
  vision?: string;
}): Promise<SurveySubmitResult> {
  try {
    const payload = await getPayload({ config });

    if (!(data.mapZoneId && data.visionCategoryId)) {
      return {
        success: false,
        message: "Please select both a Map Zone and a Vision Category.",
      };
    }

    const headerStore = await headers();
    const ip =
      headerStore.get("x-forwarded-for") ||
      headerStore.get("x-real-ip") ||
      "unknown";

    const submission = await payload.create({
      collection: "survey-sub",
      data: {
        name: data.name,
        mobile: data.mobile,
        mobileVerified: false,
        mapZone: data.mapZoneId,
        visionCategory: data.visionCategoryId,
        vision: data.vision || "My vision",
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
      },
      overrideAccess: true,
      draft: false,
    });

    return {
      success: true,
      message: "Survey submitted successfully!",
      submissionId: submission.id,
    };
  } catch (error) {
    console.error("Submit survey error:", error);
    return {
      success: false,
      message: "Failed to submit survey. Please try again.",
    };
  }
}
