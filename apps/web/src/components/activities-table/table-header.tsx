import { TableHead } from "@repo/design-system/components/ui/table";
import { cn } from "@repo/design-system/lib/utils";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";

type Props = {
  label: string;
  sortKey: string;
  currentSort: string;
  onSort: (key: string) => void;
};

export function ActivitiesTableHeader({
  label,
  sortKey,
  currentSort,
  onSort,
}: Props) {
  const isAsc = currentSort === sortKey;
  const isDesc = currentSort === `-${sortKey}`;
  const isActive = isAsc || isDesc;

  return (
    <TableHead>
      <button
        className={cn(
          "flex items-center gap-1 text-body",
          isActive ? "font-semibold" : ""
        )}
        onClick={() => onSort(sortKey)}
        type="button"
      >
        {label}
        {isActive ? (
          isAsc ? (
            <ChevronUpIcon className="h-3 w-3" />
          ) : (
            <ChevronDownIcon className="h-3 w-3" />
          )
        ) : (
          <ChevronsUpDownIcon className="h-3 w-3 opacity-40" />
        )}
      </button>
    </TableHead>
  );
}
