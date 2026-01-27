import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import type { IssueCardStat } from "@/types";
import { formatCurrency } from "@/utils";

const cardVariants = cva(
  "group relative flex aspect-square w-full flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-500 hover:shadow-xl",
  {
    variants: {
      theme: {
        blue: "bg-gradient-to-br from-blue-100 to-blue-300 text-blue-900",
        yellow: "bg-gradient-to-br from-amber-100 to-amber-300 text-amber-900",
        neutral: "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900",
        green:
          "bg-gradient-to-br from-emerald-100 to-emerald-300 text-emerald-900",
        red: "bg-gradient-to-br from-rose-100 to-rose-300 text-rose-900",
        purple:
          "bg-gradient-to-br from-purple-100 to-purple-300 text-purple-900",
      },
    },
    defaultVariants: {
      theme: "neutral",
    },
  }
);

const overlayVariants = cva(
  "pointer-events-none absolute inset-0 transition-all duration-500",
  {
    variants: {
      theme: {
        blue: "",
        yellow: "",
        neutral: "",
        green: "",
        red: "",
        purple: "",
      },
      overlayType: {
        gradient: "bg-gradient-to-t",
        solid: "backdrop-blur-[1px]",
      },
    },
    compoundVariants: [
      {
        theme: "blue",
        overlayType: "gradient",
        class: "from-blue-950/90 via-blue-900/40 to-transparent",
      },
      {
        theme: "yellow",
        overlayType: "gradient",
        class: "from-amber-950/90 via-amber-900/40 to-transparent",
      },
      {
        theme: "neutral",
        overlayType: "gradient",
        class: "from-zinc-950/90 via-zinc-900/40 to-transparent",
      },
      {
        theme: "green",
        overlayType: "gradient",
        class: "from-emerald-950/90 via-emerald-900/40 to-transparent",
      },
      {
        theme: "red",
        overlayType: "gradient",
        class: "from-rose-950/90 via-rose-900/40 to-transparent",
      },
      {
        theme: "purple",
        overlayType: "gradient",
        class: "from-purple-950/90 via-purple-900/40 to-transparent",
      },

      {
        theme: "blue",
        overlayType: "solid",
        class: "bg-blue-600/60",
      },
      {
        theme: "yellow",
        overlayType: "solid",
        class: "bg-amber-900/85 mix-blend-multiply",
      },
      {
        theme: "neutral",
        overlayType: "solid",
        class: "bg-zinc-900/85 mix-blend-multiply",
      },
      {
        theme: "green",
        overlayType: "solid",
        class: "bg-emerald-900/85 mix-blend-multiply",
      },
      {
        theme: "red",
        overlayType: "solid",
        class: "bg-rose-900/85 mix-blend-multiply",
      },
      {
        theme: "purple",
        overlayType: "solid",
        class: "bg-purple-900/85 mix-blend-multiply",
      },
    ],
    defaultVariants: {
      theme: "neutral",
      overlayType: "gradient",
    },
  }
);

type CardTheme = VariantProps<typeof cardVariants>["theme"];

type Props = {
  data: IssueCardStat;
  className?: string;
  theme?: CardTheme;
  overlayType?: "gradient" | "solid";
};

export function IssueCard({
  data,
  className,
  theme,
  overlayType = "gradient",
}: Props) {
  const hasImage = !!data.imageSrc;
  const resolvedTheme = (theme || data.color || "neutral") as CardTheme;

  return (
    <div
      className={cn(
        cardVariants({ theme: resolvedTheme }),
        hasImage && "border-white/10 bg-black text-white",
        className
      )}
    >
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
          <div
            className={overlayVariants({
              theme: resolvedTheme,
              overlayType,
            })}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col gap-1">
        <Typography
          className="font-bold text-yellow-50 uppercase leading-tight tracking-wide drop-shadow-sm"
          variant="brandHeading"
        >
          {data.name}
        </Typography>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-bold text-[10px] uppercase tracking-wider opacity-80">
            Spent
          </span>
          <span className="font-bold font-times-new-roman text-3xl tracking-tight drop-shadow-sm">
            {formatCurrency(data.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
