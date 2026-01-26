import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display:
        "font-heading leading-none text-9xl font-normal tracking-normal whitespace-nowrap",
      headingXL: "font-heading text-6xl leading-none tracking-normal font-normal [html[lang=ta-IN]_&]:font-bold [html[lang=ta-IN]_&]:leading-[1.36]",
      headingLG:
        "font-heading text-5xl leading-none tracking-normal font-normal",
      brandHeading:
        "font-heading text-4xl leading-none tracking-normal font-normal",
      headingSM:
        "font-heading text-3xl leading-none tracking-normal font-normal",
      headingXS:
        "font-body text-2xl leading-[1.1] tracking-normal font-normal [html[lang=ta-IN]_&]:leading-[1.25] [html[lang=ta-IN]_&]:tracking-[-0.01em]",
      headingXXS:
        "font-body text-xl leading-5 lg:leading-8 tracking-tight font-normal",

      h1: "font-heading text-6xl leading-none tracking-normal font-normal",
      h5: "font-body text-2xl leading-none tracking-normal font-normal",
      h6: "font-body text-xl leading-8 tracking-tight font-normal",
      bodyLG: "font-body text-base tracking-tight leading-none font-normal",
      bodyMD:
        "font-body text-base tracking-tight leading-none font-semibold",
      bodySM: "font-body text-sm tracking-tight leading-none font-light",
    },
    intent: {
      title: "text-title",
      body: "text-body",
      subtle: "text-body-subtle",
      highlight: "text-highlight",
    },
  },
  defaultVariants: {
    variant: "h1",
    intent: "body",
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
  intent,
  as: Comp = "p",
  ...props
}: TypographyProps) {
  return (
    <Comp
      className={cn(typographyVariants({ variant,intent, className }))}
      {...props}
    />
  );
}

export { Typography };
