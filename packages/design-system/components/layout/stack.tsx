import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      none: "gap-0",
      sm: "gap-4",
      base: "4xl:gap-16 gap-4 lxl:gap-12 sxl:gap-8 lg:gap-6",
      lg: "4xl:gap-32 gap-8 lxl:gap-24 sxl:gap-16 lg:gap-12",
    },
  },
  defaultVariants: {
    gap: "base",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?:
    | "div"
    | "section"
    | "article"
    | "main"
    | "aside"
    | "nav"
    | "header"
    | "footer";
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap, as: Comp = "div", ...props }, ref) => (
    <Comp
      className={cn(stackVariants({ gap }), className)}
      ref={ref}
      {...props}
    />
  )
);
Stack.displayName = "Stack";

export { Stack, stackVariants };
