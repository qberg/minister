"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { PixelImage } from "@repo/design-system/components/motion/pixel-image";
import { Button } from "@repo/design-system/components/ui/button";
import { Typography } from "@repo/design-system/components/ui/typography";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import BackgroundImage from "@/components/background-image";
import { CMSLink } from "@/components/cms-link";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { CutoutHero as CutoutHeroProps } from "@/payload-types";

type Props = {
  block: CutoutHeroProps;
};

const EASING = [0.76, 0, 0.24, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const textRevealVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASING },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASING },
  },
};

const imageScaleVariants: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: EASING },
  },
};

function CutoutHero({ block }: Props) {
  const { title, desc, cutout, portraits, stats, bgImg, link } = block;

  const bgImgSrc = getMediaUrl(bgImg);
  const cutoutSrc = getMediaUrl(cutout);

  return (
    <Box as="section" className="relative pr-0! pb-0!" invert>
      {/* Background Image - Fade in slowly */}
      <BackgroundImage alt="Bg Image" src={bgImgSrc} />

      {/* Main Container - Controls Staggering */}
      <motion.div
        animate="visible"
        className="relative z-10 mt-[22vw] sxl:mt-[8vw] flex h-full flex-col 4xl:gap-36 gap-4 lxl:gap-28 sxl:gap-20 md:mt-[6.5vw] lg:flex-row lg:justify-between lg:gap-16"
        initial="hidden"
        variants={containerVariants}
      >
        {/* Content Column */}
        <div className="lxl:mt-[3vw] sxl:mt-[2vw] flex w-full flex-col 4xl:gap-8 gap-4 lxl:gap-6 sxl:gap-5 md:w-[45%] lg:gap-3">
          {/* Portraits - Staggered Fade Up */}
          {portraits && portraits.length !== 0 && (
            <motion.div variants={fadeUpVariants}>
              <Portraits portraits={portraits} />
            </motion.div>
          )}

          {title && (
            <div className="overflow-hidden">
              <motion.div variants={textRevealVariants}>
                <Typography
                  as="h1"
                  className="text-surface-muted"
                  variant="headingXL"
                >
                  {title}
                </Typography>
              </motion.div>
            </div>
          )}

          {desc && (
            <motion.div variants={fadeUpVariants}>
              <Typography
                as="p"
                className="text-neutral-200"
                variant="headingXS"
              >
                {desc}
              </Typography>
            </motion.div>
          )}

          {link && (
            <motion.div variants={fadeUpVariants}>
              <CMSLink {...link}>
                <Button variant="secondary">{link.label}</Button>
              </CMSLink>
            </motion.div>
          )}

          {/* Stats - Staggered entrance */}
          {stats && stats.length !== 0 && (
            <motion.div
              className="mt-2 sxl:mt-12 hidden pb-8 md:block lg:mt-8"
              variants={fadeUpVariants}
            >
              <Stats stats={stats} />
            </motion.div>
          )}
        </div>

        {/* Cutout Image (Desktop) - Scale Down & Fade In */}
        <motion.div className="relative hidden aspect-square sxl:w-[50%] w-[40%] origin-bottom md:block">
          <PixelImage src={cutoutSrc} />
        </motion.div>

        {/* Mobile Layout */}
        <div className="flex md:hidden">
          <div className="w-[40%]">
            {stats && stats.length !== 0 && (
              <motion.div className="my-4" variants={fadeUpVariants}>
                <Stats stats={stats} />
              </motion.div>
            )}
          </div>

          {/* Cutout Image (Mobile) */}
          <motion.div
            className="relative aspect-square w-[60%]"
            variants={imageScaleVariants}
          >
            <Image
              alt="TMA Cutout"
              className="object-cover"
              fill
              priority
              src={cutoutSrc}
              unoptimized
            />
          </motion.div>
        </div>
      </motion.div>
    </Box>
  );
}

// Sub-components can remain static or animate internally if preferred
// But typically, animating the parent container is cleaner for performance.

type PortraitsProps = {
  portraits: CutoutHeroProps["portraits"];
};

function Portraits({ portraits }: PortraitsProps) {
  return (
    <div className="flex gap-4 md:gap-8">
      {portraits?.map((portrait) => {
        const portraitSrc = getMediaUrl(portrait.image);
        return (
          <div
            className="relative aspect-square w-12 overflow-hidden rounded-lg bg-neutral-50 md:w-[6.25vw] md:rounded-2xl"
            key={portrait.id}
          >
            <Image
              alt="Leaders Portrait"
              className="object-contain"
              fill
              priority
              src={portraitSrc}
              unoptimized
            />
          </div>
        );
      })}
    </div>
  );
}

type StatsProps = {
  stats: CutoutHeroProps["stats"];
};

function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0">
      {stats?.map((stat) => (
        <div
          className="flex flex-col items-center justify-center gap-2"
          key={stat.id}
        >
          <Typography as="h4" className="text-neutral-50" variant="headingSM">
            {stat.v}
          </Typography>
          <Typography as="span" className="" variant="bodyLG">
            {stat.l}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default CutoutHero;
