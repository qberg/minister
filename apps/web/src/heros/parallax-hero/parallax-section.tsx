"use client";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import type React from "react";
import { useRef } from "react";

type ParallaxSectionProps = {
  src: string;
  text: string;
  alt?: string;
  className?: string;
};

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  src,
  text,
  alt,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  };

  const imageYRaw = useTransform(scrollYProgress, [0.15, 0.45], [-200, 0]);
  const imageScaleRaw = useTransform(scrollYProgress, [0.15, 0.45], [0.8, 1]);
  const textScaleRaw = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.5],
    [1.25, 1.02, 1],
  );
  const textOpacityRaw = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.8]);

  const imageY = useSpring(imageYRaw, springConfig);
  const imageScale = useSpring(imageScaleRaw, springConfig);
  const textScale = useSpring(textScaleRaw, springConfig);
  const textOpacity = useSpring(textOpacityRaw, springConfig);

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
      ref={containerRef}
    >
      <motion.div
        className="pointer-events-none absolute top-[60%] left-0 w-full text-center"
        style={{
          transformOrigin: "top",
          opacity: textOpacity,
          scale: textScale,
          willChange: "transform, opacity",
        }}
      >
        <Typography as="h1" variant="display">
          {text}
        </Typography>
      </motion.div>

      <div className="relative aspect-[0.8/1] w-full max-w-[72vw] overflow-hidden rounded-lg bg-neutral-9000 lg:max-w-[50vw]">
        <motion.div
          className="h-full w-full"
          style={{
            scale: imageScale,
            y: imageY,
            willChange: "transform",
            transformOrigin: "top",
          }}
        >
          <Image
            alt={alt || "T M Anbarasan Portrait"}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 767px) 100vw, (min-width: 1024px) 60vw"
            src={src}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;
