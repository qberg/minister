'use client'

import { Typography } from "@repo/design-system/components/ui/typography"
import React from "react"
import { CMSLink } from "./cms-link"
import { Button } from "@repo/design-system/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { CarouselCard } from "@/blocks/composite-grid-block/Component"

interface CarouselProps {
    array: CarouselCard[],
}

export const Carousel = ({array}: CarouselProps) => {
    const carouselStyles = `
    .swiper-pagination-bullet {
      background: #9ca3af;
      opacity: 0.5;
    }
    .swiper-pagination-bullet-active {
      background: #aa8336;
      opacity: 1;
    }
  `;

    return (
        <div className='bg-foreground aspect-[0.86/1] md:col-start-3 md:row-span-3 md:row-start-1'>
            <style>{carouselStyles}</style>
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={0}
                pagination={{ clickable: true}}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={array.length > 1}
                className="h-full"
            >
                {array.map((data, index) => (
                    <SwiperSlide key={data.id || index} className="h-full">
                        <div className="relative z-20 flex h-full flex-col justify-center gap-8 md:gap-4 lg:gap-8 4xl:p-12 p-6 lg:p-8">
                            <Typography as="h4" className="text-secondary" variant="headingSM">
                                {data.title}
                            </Typography>
                            <Typography as="p" intent="subtle" variant="bodyLG">
                                {data.text}
                            </Typography>
                            {data.link && (
                                <div className="md:hidden xl:block">
                                    <CMSLink {...data.link}>
                                        <Button variant={"outline"}>{data.link.label}</Button>
                                    </CMSLink>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    )
}