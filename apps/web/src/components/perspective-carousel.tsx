"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react"; // 1. Import useRef
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@repo/design-system/lib/utils";
import type { IssueCardStat } from "@/types";
import { IssueCard } from "./issue-card";

type Props = {
  issues: IssueCardStat[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
};

export function PerspectiveCarousel({
  issues,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
}: Props) {
  const limitedIssues = issues.slice(0, 8);

  // 2. Create refs for the navigation buttons
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const carouselStyles = `
    .issue-carousel {
      padding-bottom: 50px !important;
    }
    .issue-carousel .swiper-pagination-bullet {
      background: #9ca3af;
      opacity: 0.5;
    }
    .issue-carousel .swiper-pagination-bullet-active {
      background: #3b82f6;
      opacity: 1;
    }
  `;

  const navButtonStyle = cn(
    "flex aspect-square cursor-pointer items-center justify-center rounded-full border border-yellow-50 text-primary transition-all disabled:cursor-not-allowed disabled:opacity-50",
    "w-12 p-2.5",
    "md:w-[3.5vw] md:p-0"
  );

  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className={cn("relative w-full", className)}
      initial={{ opacity: 0, translateY: 20 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
    >
      <style>{carouselStyles}</style>

      <Swiper
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
        }}
        centeredSlides={true}
        className="!overflow-visible issue-carousel"
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        effect="coverflow"
        grabCursor={true}
        loop={loop && limitedIssues.length > 1}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
      >
        {limitedIssues.map((issue) => (
          <SwiperSlide className="!h-auto" key={issue.id}>
            <IssueCard data={issue} />
          </SwiperSlide>
        ))}
      </Swiper>

      {(showNavigation || showPagination) && (
        <div className="flex w-full items-center justify-between gap-6 md:gap-8">
          {showNavigation && (
            <button className={cn(navButtonStyle)} ref={prevRef}>
              <ArrowLeft size={32} strokeWidth="1px" />
            </button>
          )}

          {showNavigation && (
            <button className={cn(navButtonStyle)} ref={nextRef}>
              <ArrowRight size={32} strokeWidth="1px" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
