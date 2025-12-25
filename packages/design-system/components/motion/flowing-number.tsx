import { cn } from "@repo/design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

// --- 1. THE DIGIT COMPONENT ---

const digitVariants = cva(
  "relative overflow-hidden font-normal font-times-new-roman tabular-nums leading-none tracking-normal",
  {
    variants: {
      size: {
        display: "text-9xl",
      },
      theme: {
        accent: "text-accent",
        default: "text-foreground",
      },
    },
    defaultVariants: {
      size: "display",
      theme: "accent",
    },
  }
);

type DigitVariants = VariantProps<typeof digitVariants>;

interface DigitProps extends DigitVariants {
  value: number;
  className?: string;
}

const Digit = ({ value, size, theme, className }: DigitProps) => {
  const safeValue = Math.max(0, Math.min(9, Math.floor(value)));

  return (
    <div className={cn(digitVariants({ size, theme }), className)}>
      <span className="pointer-events-none invisible opacity-0">0</span>

      <motion.div
        animate={{ y: `-${safeValue * 10}%` }}
        className="absolute top-0 left-0 flex h-auto w-full flex-col items-center"
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 45,
          mass: 1,
          restDelta: 0.01,
        }}
      >
        {NUMBERS.map((num, index) => (
          <span
            className="flex h-[1em] w-full items-center justify-center leading-none"
            key={`digit-${index}-${num}`}
          >
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- 2. THE WRAPPER COMPONENT ---

const flowingNumberVariants = cva("inline-flex items-center", {
  variants: {
    spacing: {
      tight: "gap-0",
      normal: "gap-0.5",
      wide: "gap-2",
    },
  },
  defaultVariants: {
    spacing: "tight",
  },
});

type FlowingNumberVariants = VariantProps<typeof flowingNumberVariants>;

interface FlowingNumberProps extends FlowingNumberVariants {
  value: number | string;
  digitSize?: DigitVariants["size"];
  digitTheme?: DigitVariants["theme"];
  digitClassName?: string;
  className?: string;
  leadingZeros?: number;
}

const FlowingNumber = ({
  value,
  spacing,
  digitSize,
  digitTheme,
  digitClassName,
  className,
  leadingZeros = 0,
}: FlowingNumberProps) => {
  let formattedValue = String(value);

  if (leadingZeros > 0 && formattedValue.length < leadingZeros) {
    formattedValue = formattedValue.padStart(leadingZeros, "0");
  }

  const digits = formattedValue.split("").map((char) => {
    const parsed = Number.parseInt(char, 10);
    return isNaN(parsed) ? 0 : parsed;
  });

  return (
    <div className={cn(flowingNumberVariants({ spacing }), className)}>
      <span className="sr-only">{formattedValue}</span>

      <div
        aria-hidden="true"
        className={cn("flex", flowingNumberVariants({ spacing }))}
      >
        {digits.map((digit, index) => (
          <Digit
            className={digitClassName}
            // biome-ignore lint/suspicious/noArrayIndexKey: needed for stable component identity during animation, leave me alone
            key={`digit-${index}`}
            size={digitSize}
            theme={digitTheme}
            value={digit}
          />
        ))}
      </div>
    </div>
  );
};

export { Digit, FlowingNumber };
