import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "../../lib/utils";

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      base: "4xl:px-48 lxl:px-36 px-6 sxl:px-24 4xl:py-20 lxl:py-16 py-10 sxl:py-10 md:px-10 lg:px-20 lg:py-8",
    },
    invert: {
      true: "bg-foreground text-background",
      false: "bg-background text-foreground",
    },
    borderWidth: {
      none: "-outline-offset-2 border-0 outline outline-2 outline-transparent",
      thin: "border border-current",
      thick: "border-2 border-current",
    },
    overflow: {
      hidden: "overflow-hidden",
      visible: "overflow-visible",
      auto: "overflow-auto",
      scroll: "overflow-scroll",
    },
  },
  defaultVariants: {
    padding: "base",
    borderWidth: "none",
    invert: false,
    overflow: "hidden",
  },
});

type BoxElement = "div" | "section" | "article" | "aside" | "header" | "footer";

export interface BoxProps<T extends BoxElement = "div">
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  as?: T;
  ref?: React.Ref<HTMLElement>;
}

const Box = <T extends BoxElement = "div">({
  className,
  padding,
  borderWidth,
  invert,
  overflow,
  as,
  ref,
  ...props
}: BoxProps<T>) => {
  const Comp = (as || "div") as React.ElementType;

  return (
    <Comp
      className={cn(
        boxVariants({ padding, borderWidth, invert, overflow }),
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

Box.displayName = "Box";

export { Box, boxVariants };
export type BoxPadding = NonNullable<BoxProps["padding"]>;
