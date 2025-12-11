"use client";

import { Stack } from "@repo/design-system/components/layout/stack";
import { AppearSlide } from "@repo/design-system/components/motion/appear-slide";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { motion } from "motion/react";
import {
  type StickyStatsVariant,
  stickyStatBlockDescVariants,
  stickyStatLabelVariants,
} from "./variants";

type StatItemProps = {
  value: string;
  label: string;
  className?: string;
  variant?: StickyStatsVariant;
  index?: number;
};

const StatItem = ({
  value,
  label,
  className,
  variant = "midnight",
  index = 0,
}: StatItemProps) => (
  <div className={cn("", className)}>
    <AppearSlide delay={index * 0.15}>
      <Typography as="h2" className="mb-1 text-accent" variant="headingLG">
        {value}
      </Typography>
    </AppearSlide>
    <Typography
      as="p"
      className={stickyStatLabelVariants({ variant })}
      variant="bodyLG"
    >
      {label}
    </Typography>
  </div>
);

StatItem.displayName = "StatItem";

// ============================================================================

type StatGridProps = {
  children: React.ReactNode;
  className?: string;
};

const StatGrid = ({ children, className }: StatGridProps) => (
  <div className={cn("relative 4xl:pb-12 pb-4 lg:pb-8", className)}>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{children}</div>

    <motion.div
      className="absolute bottom-0 left-0 h-px bg-neutral-50"
      initial={{ width: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileInView={{ width: "100%" }}
    />
  </div>
);

StatGrid.displayName = "StatGrid";

// ============================================================================

type StatBlockProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  variant?: StickyStatsVariant;
};

const StatBlock = ({
  title,
  description,
  children,
  className,
  variant = "midnight",
}: StatBlockProps) => (
  <Stack className={className} gap="sm">
    <Typography as="h6" className="text-secondary" variant="bodyLG">
      {title}
    </Typography>
    <Typography
      as="h6"
      className={stickyStatBlockDescVariants({ variant })}
      variant="headingXXS"
    >
      {description}
    </Typography>
    {children}
  </Stack>
);

StatBlock.displayName = "StatBlock";

// ============================================================================

export { StatBlock, StatGrid, StatItem };
