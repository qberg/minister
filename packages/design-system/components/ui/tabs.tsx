"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "../../lib/utils";

// Variants for TabsList
const tabsListVariants = cva(
  "flex items-center shrink-0 border-border border-b-[1.25px]",
  {
    variants: {
      variant: {
        button: "",
        line: "",
      },
      shape: {
        default: "",
        pill: "",
      },
      size: {
        lg: "gap-8",
        md: "gap-2",
        sm: "gap-1.5",
        xs: "gap-1",
      },
    },
    compoundVariants: [
      { variant: "line", size: "lg", className: "gap-9" },
      { variant: "line", size: "md", className: "gap-8" },
      { variant: "line", size: "sm", className: "gap-4" },
      { variant: "line", size: "xs", className: "gap-4" },

      {
        variant: "button",
        shape: "pill",
        className: "rounded-full [&_[role=tab]]:rounded-full",
      },
    ],
    defaultVariants: {
      variant: "button",
      size: "md",
    },
  },
);

// Variants for TabsTrigger
const tabsTriggerVariants = cva(
  "shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary",
  {
    variants: {
      variant: {
        button:
          "focus-visible:ring-2 text-body-subtle focus-visible:ring-ring focus-visible:ring-offset-2 hover:text-foreground data-[state=active]:bg-accent data-[state=active]:text-white font-semibold",
        line: "border-b-2 text-muted-foreground border-transparent data-[state=active]:border-primary hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-secondary data-[state=active]:text-secondary",
      },
      size: {
        lg: "gap-2.5 [&_svg]:size-5 text-sm",
        md: "gap-2 [&_svg]:size-4 text-sm",
        sm: "gap-1.5 [&_svg]:size-3.5 text-xs",
        xs: "gap-1 [&_svg]:size-3.5 text-xs",
      },
    },
    compoundVariants: [
      {
        variant: "button",
        size: "lg",
        className: "py-3 px-6 lg:py-4 lg:px-8 4xl:py-8 4xl:px-16",
      },
      { variant: "button", size: "md", className: "py-2.5 px-3" },
      { variant: "button", size: "sm", className: "py-2 px-2.5" },
      { variant: "button", size: "xs", className: "py-1.5 px-2" },

      {
        variant: "line",
        size: "lg",
        className: "py-3 px-6 lg:py-4 lg:px-8 4xl:py-8 4xl:px-16",
      },
      { variant: "line", size: "md", className: "py-2.5" },
      { variant: "line", size: "sm", className: "py-2" },
      { variant: "line", size: "xs", className: "py-1.5" },
    ],
    defaultVariants: {
      variant: "button",
      size: "md",
    },
  },
);

const tabsContentVariants = cva(
  "mt-2.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TabsContextType = {
  variant?:  "button" | "line";
  size?: "lg" | "sm" | "xs" | "md";
};
const TabsContext = React.createContext<TabsContextType>({
  variant: "button",
  size: "md",
});

// Components
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant = "line",
  shape = "default",
  size = "md",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsContext.Provider
      value={{ variant: variant || "line", size: size || "md" }}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant, shape, size }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, size } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
