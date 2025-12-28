"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import { cn } from "@repo/design-system/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import type { IssueCardStat } from "@/types";
import { IssueCard } from "./issue-card";

type Props = {
  issues: IssueCardStat[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
};

export function IssueCarouselEmbla({
  issues,
  className,
  autoplay = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const limitedIssues = issues.slice(0, 8);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
      setApi={setApi}
    >
      <CarouselContent className="!overflow-visible flex 4xl:h-[550px] h-[500px] lxl:h-[500px] w-full md:h-[450px]">
        {limitedIssues.map((issue, index) => (
          <CarouselItem
            className="relative flex h-[95%] w-full 4xl:basis-[30%] basis-[80%] lxl:basis-[25%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[30%] 2xl:basis-[30%]"
            key={issue.id}
          >
            {/* Animated clip-path container */}
            <motion.div
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0 15% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
              initial={false}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <IssueCard className="h-full" data={issue} />
            </motion.div>

            {/* Bottom label - shows stats for active card *
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full flex-col items-center justify-center p-2 text-center"
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-medium text-gray-800 text-sm tracking-tight">
                    {issue.activityCount} Activities
                  </div>
                  <div className="font-bold text-gray-900 text-xl">
                    {formatCurrency(issue.totalAmount)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            */}
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      {showNavigation && (
        <div className="-bottom-4 absolute right-0 flex w-full items-center justify-between gap-2 px-8">
          <button
            aria-label="Previous slide"
            className="rounded-full bg-black/10 p-2 transition-colors hover:bg-black/20"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            aria-label="Next slide"
            className="rounded-full bg-black/10 p-2 transition-colors hover:bg-black/20"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      )}

      {/* Pagination Dots */}
      {showPagination && (
        <div className="flex w-full items-center justify-center pt-6">
          <div className="flex items-center justify-center gap-2">
            {limitedIssues.map((_, index) => (
              <button
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all",
                  current === index ? "w-8 bg-blue-600" : "bg-gray-300"
                )}
                key={index}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
}
