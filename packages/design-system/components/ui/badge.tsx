import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const badgeVariants = cva(
  "inline-flex justify-center items-center whitespace-nowrap border border-transparent focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0 overflow-hidden w-fit",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        lg: "px-3 py-1",
      },
      shape: {
        default: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "lg",
      shape: "circle",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
