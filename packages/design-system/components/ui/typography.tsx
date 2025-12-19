import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/design-system/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display:
        "font-times-new-roman leading-none text-9xl font-normal tracking-normal whitespace-nowrap",
      h1: "font-times-new-roman text-6xl leading-none tracking-normal font-normal",
      headingLG:
        "font-times-new-roman text-5xl leading-none tracking-normal font-normal",
      brandHeading:
        "font-times-new-roman text-4xl leading-none tracking-normal font-normal",
      h5: "font-dm-sans text-2xl leading-none tracking-normal font-normal",
      headingXS:
        "font-dm-sans text-2xl leading-none tracking-normal font-normal",
      h6: "font-dm-sans text-xl leading-8 tracking-tight font-normal",
      headingXXS: "font-dm-sans text-xl leading-8 tracking-tight font-normal",
      bodyLG: "font-dm-sans text-base tracking-tight leading-none font-normal",
      bodyMD:
        "font-dm-sans text-base tracking-tight leading-none font-semibold",
      bodySM: "font-dm-sans text-sm tracking-tight leading-none font-light",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

function Typography({
  className,
  variant,
  as: Comp = "p",
  ...props
}: TypographyProps) {
  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Typography };
