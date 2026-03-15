"use client";

import type { TypedLocale } from "payload";
import type { IssueOption } from "@/app/actions/get-issues";
import { ActivitiesTable } from "@/components/activities-table";
import { AnimatedHeading } from "@/components/animated-heading";

type Props = {
  locale: TypedLocale;
  activeZoneSlug: string | null;
  zoneName: string | null;
  issueOptions: IssueOption[];
};

export function ActivitiesSection({
  locale,
  activeZoneSlug,
  zoneName,
  issueOptions,
}: Props) {
  const heading = zoneName ? `Detailed Works ${zoneName}` : "Detailed Works";

  return (
    <div className="flex flex-col gap-6">
      <AnimatedHeading className="text-primary leading-[120%]" text={heading} />
      <ActivitiesTable
        activeZoneSlug={activeZoneSlug}
        issueOptions={issueOptions}
        locale={locale}
      />
    </div>
  );
}
