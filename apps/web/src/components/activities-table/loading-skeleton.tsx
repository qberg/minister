import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import { cn } from "@repo/design-system/lib/utils";

type Props = {
  columns: number;
  rows: number;
};

function SkeletonCell({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-4 animate-pulse rounded bg-neutral-200", className)}
    />
  );
}

export function ActivitiesTableSkeleton({ columns, rows }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, i) => (
            <TableHead key={i}>
              <SkeletonCell className="w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowI) => (
          <TableRow key={rowI}>
            {Array.from({ length: columns }).map((_, colI) => (
              <TableCell key={colI}>
                <SkeletonCell
                  className={cn(
                    colI === 0 && "w-6",
                    colI === 1 && "w-48",
                    colI === 2 && "w-20",
                    colI === 3 && "w-24",
                    colI === 4 && "w-24",
                    colI === 5 && "w-28",
                    colI === 6 && "w-16"
                  )}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
