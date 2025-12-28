"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
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
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
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

        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
}
