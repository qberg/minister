"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import { useTranslations } from "@repo/i18n";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import type { TypedLocale } from "payload";
import { useEffect, useState } from "react";
import {
  type ActivitiesResult,
  getActivities,
} from "@/app/actions/get-activities";
import type { IssueOption } from "@/app/actions/get-issues";
import { ActivitiesTableSkeleton } from "./loading-skeleton";
import { ActivitiesPagination } from "./pagination";
import { ActivitiesTableHeader } from "./table-header";
import { ActivitiesTableRow } from "./table-row";
import { TypeFilter } from "./type-filter";

type Props = {
  locale: TypedLocale;
  activeZoneSlug: string | null;
  issueOptions: IssueOption[];
};

const LIMIT_OPTIONS = [10, 25, 50];

const COLUMNS = [
  { key: "title", labelKey: "col_name" },
  // { key: "cost", labelKey: "col_amount" },
  { key: "type", labelKey: "col_type" },
  { key: "zone", labelKey: "col_ward" },
  { key: "scheme", labelKey: "col_scheme" },
  { key: "financialYear", labelKey: "col_year" },
] as const;

type TableState = "loading" | "empty" | "populated";

export function ActivitiesTable({
  locale,
  activeZoneSlug,
  issueOptions,
}: Props) {
  const t = useTranslations("ActivitiesTable");

  const [actType, setActType] = useQueryState(
    "act-type",
    parseAsString.withOptions({ shallow: true, history: "replace" })
  );
  const [actSort, setActSort] = useQueryState(
    "act-sort",
    parseAsString.withOptions({ shallow: true, history: "replace" })
  );
  const [actPage, setActPage] = useQueryState(
    "act-page",
    parseAsInteger.withOptions({ shallow: true, history: "replace" })
  );
  const [actLimit, setActLimit] = useQueryState(
    "act-limit",
    parseAsInteger.withOptions({ shallow: true, history: "replace" })
  );

  const currentSort = actSort ?? "-financialYear";
  const currentPage = actPage ?? 1;
  const currentLimit = actLimit ?? 10;

  const [result, setResult] = useState<ActivitiesResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getActivities({
      zone: activeZoneSlug,
      type: actType ?? undefined,
      sort: currentSort,
      page: currentPage,
      limit: currentLimit,
    }).then((data) => {
      if (isMounted) {
        setResult(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeZoneSlug, actType, currentSort, currentPage, currentLimit]);

  const handleSort = (key: string) => {
    const next = currentSort === key ? `-${key}` : key;
    setActSort(next);
    setActPage(1);
  };

  const handleTypeChange = (slug: string | null) => {
    setActType(slug);
    setActPage(1);
  };

  let tableState: TableState = "loading";
  if (isLoading) {
    tableState = "loading";
  } else if (!result || result.docs.length === 0) {
    tableState = "empty";
  } else {
    tableState = "populated";
  }

  const renderTableContent = () => {
    switch (tableState) {
      case "loading":
        return (
          <ActivitiesTableSkeleton
            columns={COLUMNS.length + 1}
            rows={currentLimit}
          />
        );
      case "empty":
        return (
          <p className="py-12 text-center text-body-subtle">
            {t("no_results")}
          </p>
        );
      case "populated":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-12">{t("col_no")}</TableHead> */}
                {COLUMNS.map((col) => (
                  <ActivitiesTableHeader
                    currentSort={currentSort}
                    key={col.key}
                    label={t(col.labelKey)}
                    onSort={handleSort}
                    sortKey={col.key}
                  />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.docs.map((activity, index) => (
                <ActivitiesTableRow
                  activity={activity}
                  index={(currentPage - 1) * currentLimit + index + 1}
                  key={activity.id}
                  locale={locale}
                />
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <TypeFilter
        issues={issueOptions}
        onChange={handleTypeChange}
        placeholder={t("filter_type_placeholder")}
        value={actType ?? null}
      /> */}

      {renderTableContent()}

      {result && result.totalPages > 1 && (
        <ActivitiesPagination
          limit={currentLimit}
          limitOptions={LIMIT_OPTIONS}
          onLimitChange={(l) => {
            setActLimit(l);
            setActPage(1);
          }}
          onPageChange={setActPage}
          page={currentPage}
          t={t}
          totalDocs={result.totalDocs}
          totalPages={result.totalPages}
        />
      )}
    </div>
  );
}
