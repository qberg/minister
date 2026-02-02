"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Button } from "@repo/design-system/components/ui/button";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { TypedLocale } from "payload";
import { CMSLink } from "@/components/cms-link";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { VideoHero as VideoHeroProps } from "@/payload-types";

type Props = {
  block: VideoHeroProps;
  locale?: TypedLocale;
};

export function VideoHero({ block }: Props) {
  const { title, desc, cutout, portraits, bgVideo, mobileBgVideo, link } =
    block;

  const cutoutSrc = getMediaUrl(cutout);

  const desktopVideoSrc = getMediaUrl(bgVideo);

  const mobileVideoSrc = mobileBgVideo
    ? getMediaUrl(mobileBgVideo)
    : desktopVideoSrc;

  return (
    <>
      <Box as="section" className="relative h-svh pb-0! md:h-screen">
        <div className="absolute inset-0 z-0 select-none">
          {mobileVideoSrc && (
            <video
              autoPlay
              className="block h-full w-full object-cover md:hidden"
              loop
              muted
              playsInline
              src={mobileVideoSrc}
            />
          )}

          {desktopVideoSrc && (
            <video
              autoPlay
              className={cn(
                mobileBgVideo ? "hidden md:block" : "block",
                "h-full w-full object-cover"
              )}
              loop
              muted
              playsInline
              src={desktopVideoSrc}
            />
          )}
        </div>
        <div className="-translate-x-1/2 absolute bottom-0 left-1/2 z-10 aspect-[1.15/1] w-full md:w-[42vw]">
          <Image
            alt="TMA Portrait"
            className="object-contain"
            fill
            priority
            src={cutoutSrc}
          />
        </div>
        <div className="relative z-20 flex h-full flex-col justify-between bg-transparent pt-[19vw] md:pt-[6.5vw]">
          <div>
            {portraits && portraits.length !== 0 && (
              <motion.div>
                <Portraits portraits={portraits} />
              </motion.div>
            )}
          </div>

          <div
            className={cn(
              "flex flex-col 4xl:gap-8 gap-4 lxl:gap-6 sxl:gap-5 bg-gradient-to-b from-black/0 to-black",
              "pt-[3vw] md:py-[3vw]",
              "4xl:px-48 lxl:px-36 px-6 sxl:px-24 md:px-10 lg:px-20",
              "-mx-6 md:-mx-10 lg:-mx-20 sxl:-mx-24 lxl:-mx-36 4xl:-mx-48"
            )}
          >
            <div className="border-body-subtle border-b">
              <Typography
                as="h1"
                className="pb-4 font-bold md:pb-0"
                intent={"body"}
                variant="headingXL"
              >
                {title}
              </Typography>
            </div>

            <div className="hidden items-center justify-between gap-4 md:flex">
              <Typography
                as="p"
                className="max-w-[55ch]"
                intent={"subtle"}
                variant="bodyLG"
              >
                {desc}
              </Typography>

              {link && (
                <motion.div>
                  <CMSLink {...link}>
                    <Button size={"spacious"} variant="primary">
                      {link.label}
                    </Button>
                  </CMSLink>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Box>

      <Box className="flex flex-col gap-6 md:hidden">
        <Typography
          as="p"
          className="max-w-[55ch]"
          intent={"subtle"}
          variant="bodyLG"
        >
          {desc}
        </Typography>

        {link && (
          <motion.div>
            <CMSLink {...link}>
              <Button size={"spacious"} variant="primary">
                {link.label}
              </Button>
            </CMSLink>
          </motion.div>
        )}
      </Box>
    </>
  );
}

type PortraitsProps = {
  portraits: VideoHeroProps["portraits"];
};

function Portraits({ portraits }: PortraitsProps) {
  return (
    <div className="flex gap-3 sxl:gap-8 md:gap-4">
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
            />
          </div>
        );
      })}
    </div>
  );
}
