import { AllImpactStats } from "@/types";

export function transformZoneToStats(zoneData: any): AllImpactStats {
  const issuesBreakdown = (zoneData.issuesBreakdown as Array<any> ?? []).map(
    (item) => ({
      id: item.issueType?.id ?? "unknown",
      name: item.issueType?.name ?? "Uncategorized",
      slug: item.issueType?.slug ?? "unknown",
      color: item.issueType?.color ?? "blue",
      activityCount: item.activityCount ?? 0,
      imageSrc: item.issueType?.icon?.url ?? null,
    })
  );

  return {
    totalActivities: zoneData.totalActivities ?? 0,
    totalAmount: zoneData.totalAmount ?? 0,
    totalIssues: zoneData.totalIssues ?? 0,
    issuesBreakdown,
  };
}