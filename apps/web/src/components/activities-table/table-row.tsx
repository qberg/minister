import { TableCell, TableRow } from "@repo/design-system/components/ui/table";
import type { TypedLocale } from "payload";
import type { PopulatedActivity } from "@/app/actions/get-activities";
import { formatCurrency } from "@/utils";

type Props = {
  activity: PopulatedActivity;
  index: number;
  locale: TypedLocale;
};

export function ActivitiesTableRow({ activity, index, locale }: Props) {
  const zoneName =
    typeof activity.zone === "object" && activity.zone !== null
      ? activity.zone.name
      : "—";

  const typeName =
    typeof activity.type === "object" && activity.type !== null
      ? activity.type.name
      : "—";

  return (
    <TableRow>
      <TableCell className="text-body-subtle tabular-nums">{index}</TableCell>
      <TableCell className="max-w-[30ch] whitespace-normal">
        {activity.title}
      </TableCell>
      <TableCell className="tabular-nums">
        {formatCurrency(activity.cost)}
      </TableCell>
      <TableCell>{typeName}</TableCell>
      <TableCell>{zoneName}</TableCell>
      <TableCell>{activity.scheme ?? "—"}</TableCell>
      <TableCell>{activity.financialYear ?? "—"}</TableCell>
    </TableRow>
  );
}
