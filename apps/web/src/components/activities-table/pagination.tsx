import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/design-system/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  totalDocs: number;
  limit: number;
  limitOptions: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  t: (key: string) => string;
};

function getPageNumbers(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", total];
  }
  if (current >= total - 3) {
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export function ActivitiesPagination({
  page,
  totalPages,
  totalDocs,
  limit,
  limitOptions,
  onPageChange,
  onLimitChange,
  t,
}: Props) {
  const pages = getPageNumbers(page, totalPages);
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalDocs);

  return (
    <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-between">
      <div className="flex shrink-0 items-center gap-2 text-body-subtle text-sm">
        <span>
          {from}–{to} {t("pagination_of")} {totalDocs} {t("pagination_items")}
        </span>
        <span className="text-neutral-400">·</span>
        <span>{t("limit_label")}</span>
        <select
          className="rounded border border-neutral-300 bg-transparent px-2 py-1 text-body text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          onChange={(e) => onLimitChange(Number(e.target.value))}
          value={limit}
        >
          {limitOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={page <= 1 ? "pointer-events-none opacity-40" : ""}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) {
                  onPageChange(page - 1);
                }
              }}
            />
          </PaginationItem>

          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              className={
                page >= totalPages ? "pointer-events-none opacity-40" : ""
              }
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) {
                  onPageChange(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
