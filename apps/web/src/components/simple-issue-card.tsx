import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import type { IssueCardStat } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  data: IssueCardStat;
};

export function SimpleIssueCard({ data }: Props) {
  const hasImage = !!data.imageSrc;
  return (
    <div className="theme-dark relative aspect-[1.75/1] overflow-hidden rounded-lg p-6">
      {hasImage && (
        <>
          <Image
            alt={data.name}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={data.imageSrc || ""}
          />
          {/* Apply the overlay logic here */}
          <div className="absolute inset-0 bg-primary/70" />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Typography as={"p"} variant={"bodyLG"}>
            {data.name}
          </Typography>

          <Typography as={"p"} variant={"brandHeading"}>
            {data.activityCount}
          </Typography>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Typography as={"p"} variant={"bodyLG"}>
            Amount Spent
          </Typography>

          <Typography as={"p"} variant={"brandHeading"}>
            {formatCurrency(data.totalAmount)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
