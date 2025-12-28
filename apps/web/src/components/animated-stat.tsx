"use client";

import NumberFlow from "@number-flow/react";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useMemo } from "react";

type Props = {
  label: string;
  value: number;
  type?: "currency" | "count";
  isLoading?: boolean;
  className?: string;
  delay?: number;
};

function AnimatedStat({ label, value, type, isLoading, className }: Props) {
  const { displayValue, suffix } = useMemo(() => {
    if (type === "count") {
      return {
        displayValue: value,
        suffix: "",
      };
    }

    if (value >= 10_000_000) {
      return {
        displayValue: Number((value / 10_000_000).toFixed(2)),
        suffix: " Cr",
      };
    }

    if (value >= 100_000) {
      return {
        displayValue: Number((value / 100_000).toFixed(2)),
        suffix: " L",
      };
    }
    return { displayValue: value, suffix: "" };
  }, [value, type]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl px-6 pt-6 transition-all duration-500",
        className
      )}
    >
      {/* THE LABEL */}
      <Typography
        as="span"
        className="mb-2 font-normal text-yellow-50/80"
        variant="bodyMD"
      >
        {label}
      </Typography>

      {/* THE NUMBER CONTAINER */}
      <div
        className={cn(
          "z-0 font-normal font-times-new-roman text-5xl text-yellow-50 tracking-tight",
          "transition-all duration-300 ease-in-out", // Smooth transition for the blur
          isLoading
            ? "scale-[0.98] opacity-75 blur-[2px]"
            : "scale-100 opacity-100 blur-0"
        )}
      >
        <NumberFlow
          format={{
            minimumFractionDigits: type === "currency" ? 0 : 0,
            maximumFractionDigits: type === "currency" ? 2 : 0,
          }}
          opacityTiming={{ duration: 300 }}
          prefix={type === "currency" ? "₹ " : ""}
          spinTiming={{
            duration: 700,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          suffix={suffix}
          transformTiming={{
            duration: 700,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          trend={0}
          value={displayValue}
        />
      </div>
    </div>
  );
}

export default AnimatedStat;
