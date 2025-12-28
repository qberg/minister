"use client";

import { FlowingNumber } from "@repo/design-system/components/motion/flowing-number";
import { TextReveal } from "@repo/design-system/components/motion/text-reveal";
import { Typography } from "@repo/design-system/components/ui/typography";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { TimelineItem } from "@/types";

const textVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
};

const containerExitVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    transition: { duration: 0.3 },
  },
};

function TimeLineContent({ items }: { items: TimelineItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedItem = items[currentIndex];
  if (!selectedItem) {
    return null;
  }

  const activeYear = selectedItem.year;
  const title = selectedItem?.title;
  const description = selectedItem?.description;
  const imageSrc = getMediaUrl(selectedItem?.image);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="relative mx-auto flex w-full w-full flex-col gap-6 md:max-w-[95%] md:flex-row lg:gap-8">
      {/*desktop nav*/}
      <button
        className="-translate-x-[125%] -translate-y-1/2 absolute top-1/2 left-0 hidden aspect-square w-[3.5vw] items-center justify-center rounded-full border border-yellow-50 md:flex"
        onClick={handlePrev}
      >
        <ArrowLeft size={32} strokeWidth="1px" />
      </button>

      <button
        className="-translate-y-1/2 absolute top-1/2 right-0 hidden aspect-square w-[3.5vw] translate-x-[140%] items-center justify-center rounded-full border border-yellow-50 md:flex"
        onClick={handleNext}
      >
        <ArrowRight size={32} strokeWidth="1px" />
      </button>
      {/*year + content*/}
      <div className="flex flex-1 flex-col justify-between gap-6">
        <FlowingNumber value={activeYear} />

        <div className="relative min-h-[100px] lg:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              animate="visible"
              className="flex flex-col gap-6 lg:gap-8" // Let TextReveal handle the hidden->visible state
              exit="exit"
              initial="visible"
              key={activeYear}
              variants={containerExitVariants}
            >
              {title && (
                <Typography
                  as="h4"
                  className="text-accent"
                  variant="brandHeading"
                >
                  <TextReveal
                    className="leading-tight"
                    duration={0.1}
                    variant="scale"
                  >
                    {title}
                  </TextReveal>
                </Typography>
              )}
              {description && (
                <Typography as="h6" variant="headingXXS">
                  <TextReveal
                    delay={0.2}
                    duration={0.4}
                    variant="fade"
                    wordLevel
                  >
                    {description}
                  </TextReveal>
                </Typography>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="-mx-6 relative aspect-square w-screen flex-1 overflow-hidden md:mx-0 md:rounded-lg">
        <AnimatePresence mode="popLayout">
          <motion.div
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            className="absolute inset-0 h-full w-full"
            exit={{ opacity: 0, scale: 1 }}
            initial={{ opacity: 0, scale: 1.2, filter: "blur(15px)" }}
            key={activeYear}
            transition={{
              duration: 1.2,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <Image
              alt={`${activeYear} Image`}
              className="object-cover"
              fill
              priority
              src={imageSrc}
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/*mobile next/prev*/}
      <div className="flex w-full justify-between md:hidden">
        <button
          className="aspect-square items-center justify-center rounded-full border border-yellow-50 p-2"
          onClick={handlePrev}
        >
          <ArrowLeft size={24} strokeWidth="1px" />
        </button>

        <button
          className="aspect-square items-center justify-center rounded-full border border-yellow-50 p-2"
          onClick={handleNext}
        >
          <ArrowRight size={24} strokeWidth="1px" />
        </button>
      </div>
    </div>
  );
}

export default TimeLineContent;
