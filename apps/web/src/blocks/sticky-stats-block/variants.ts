import { cva, type VariantProps } from "class-variance-authority";

export const stickyStatsVariants = cva(
  "-mt-[100vh] relative z-10 min-h-screen overflow-hidden",
  {
    variants: {
      variant: {
        midnight: "bg-foreground",
        blue: "bg-blue-600",
        light: "bg-background",
      },
    },
    defaultVariants: {
      variant: "midnight",
    },
  }
);

export const stickyStatsTextVariants = cva("", {
  variants: {
    variant: {
      midnight: "text-yellow-50",
      blue: "text-yellow-50",
      light: "text-blue-600",
    },
  },
  defaultVariants: {
    variant: "midnight",
  },
});

export const stickyStatBlockDescVariants = cva("", {
  variants: {
    variant: {
      midnight: "text-background",
      blue: "text-background",
      light: "text-neutral-600",
    },
  },
  defaultVariants: {
    variant: "midnight",
  },
});

export const stickyStatLabelVariants = cva("", {
  variants: {
    variant: {
      midnight: "text-neutral-50",
      blue: "text-neutral-200",
      light: "text-neutral-600",
    },
  },
  defaultVariants: {
    variant: "midnight",
  },
});

export type StickyStatsVariant = NonNullable<
  VariantProps<typeof stickyStatsVariants>["variant"]
>;
