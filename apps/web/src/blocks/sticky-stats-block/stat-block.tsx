"use client";

import { Stack } from "@repo/design-system/components/layout/stack";
import { AppearSlide } from "@repo/design-system/components/motion/appear-slide";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { motion } from "motion/react";
import type { StickyStatsVariant } from "./variants";

type StatItemProps = {
  value: string;
  label: string;
  className?: string;
  variant?: StickyStatsVariant;
  index?: number;
};

const StatItem = ({ value, label, className, index = 0 }: StatItemProps) => (
  <div className={cn("", className)}>
    <AppearSlide delay={index * 0.15}>
      <Typography as="h2" className="mb-1 leading-tight whitespace-normal wrap-break-word" intent={"title"} variant="headingMD">
        {value}
      </Typography>
    </AppearSlide>
    <Typography as="p" intent={"subtle"} variant="headingXXS">
      {label}
    </Typography>
  </div>
);

StatItem.displayName = "StatItem";

// ============================================================================

type StatGridProps = {
  children: React.ReactNode;
  className?: string;
  blkType: 'sBlk' | 'iBlk';
};

const StatGrid = ({ children, className, blkType }: StatGridProps) => (
  <div className={cn(`relative 4xl:pb-12 pb-4 lg:pb-8`, className)}>
    <div className={`grid gap-8 ${blkType === 'iBlk' ? 'grid-cols-2 lg:grid-cols-3':'grid-cols-1 lg:grid-cols-2'}`}>{children}</div>

    {blkType === 'sBlk' && (
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-body-subtle"
        initial={{ width: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ width: "100%" }}
      />
    )}
  </div>
);

StatGrid.displayName = "StatGrid";

// ============================================================================

type StatBlockProps = {
  title: string;
  description: string | null;
  children: React.ReactNode;
  className?: string;
  variant?: StickyStatsVariant;
  blkType: 'sBlk' | 'iBlk'
};

const StatBlock = ({
  title,
  description,
  children,
  className,
  blkType
}: StatBlockProps) => (
  <div className={`relative ${blkType==='iBlk' ? '4xl:pb-12 pb-4 lg:pb-8':''}`}>
    <Stack className={className} gap="sm">
      <Typography as="h6" className="" intent={"title"} variant="bodyLG">
        {title}
      </Typography>
      {blkType === 'sBlk' && description && (
        <Typography as="h6" intent={"subtle"} variant="headingXXS">
          {description}
        </Typography>
      )}
      {children}
      {blkType === 'iBlk' && description && (
        <Typography as="h6" intent={"subtle"} variant="headingXXS">
          {description}
        </Typography>
      )}
    </Stack>
    {blkType === 'iBlk' && (
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-body-subtle"
        initial={{ width: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ width: "100%" }}
      />
    )}
  </div>
);

StatBlock.displayName = "StatBlock";

// ============================================================================

export { StatBlock, StatGrid, StatItem };
