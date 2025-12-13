"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@repo/design-system/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const iosEasing = [0.25, 0.1, 0.25, 1] as const;

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={className}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: HTMLMotionProps<"ol">) {
  return (
    <motion.ol
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            ease: iosEasing,
          },
        },
      }}
      initial="hidden"
      animate="show"
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: HTMLMotionProps<"li">) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.3, ease: iosEasing },
        },
      }}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "transition-all duration-200 ease-out text-muted-foreground",
        "hover:text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-sm",
        "active:scale-95",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn(
        "text-background transition-colors duration-200",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: HTMLMotionProps<"li"> & { children?: React.ReactNode }) {
  return (
    <motion.li
      role="presentation"
      aria-hidden="true"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.2, ease: iosEasing },
        },
      }}
      data-slot="breadcrumb-separator"
      className={cn(
        "[&>svg]:size-3.5 text-muted-foreground/50 transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRight />}
    </motion.li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: HTMLMotionProps<"span">) {
  return (
    <motion.span
      role="presentation"
      aria-hidden="true"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1, ease: iosEasing }}
      data-slot="breadcrumb-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center",
        "rounded-md hover:bg-accent hover:text-accent-foreground",
        "transition-colors duration-200",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </motion.span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
