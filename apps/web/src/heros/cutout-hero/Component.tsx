import { Box } from "@repo/design-system/components/layout/box";
import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import BackgroundImage from "@/components/background-image";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { CutoutHero as CutoutHeroProps } from "@/payload-types";

type Props = {
  block: CutoutHeroProps;
};

function CutoutHero({ block }: Props) {
  const { title, desc, cutout, portraits, stats, bgImg } = block;

  const bgImgSrc = getMediaUrl(bgImg);
  const cutoutSrc = getMediaUrl(cutout);

  return (
    <Box as="section" className="relative pr-0! pb-0! md:min-h-screen" invert>
      {/*bg image*/}
      <BackgroundImage alt="Bg Image" src={bgImgSrc} />
      <div className="relative z-10 mt-[22vw] flex flex-col 4xl:gap-36 gap-4 lxl:gap-28 sxl:gap-20 md:mt-[9vw] md:flex-row md:justify-between lg:gap-16">
        {/*content flex*/}
        <div className="flex w-full flex-col 4xl:gap-8 gap-4 lxl:gap-6 sxl:gap-5 md:w-[45%]">
          {/*portraits*/}
          {portraits && portraits.length !== 0 && (
            <Portraits portraits={portraits} />
          )}

          {/*title*/}
          {title && (
            <Typography
              as="h1"
              className="text-surface-muted"
              variant="headingXL"
            >
              {title}
            </Typography>
          )}

          {/*description*/}
          {desc && (
            <Typography as="p" className="text-neutral-200" variant="headingXS">
              {desc}
            </Typography>
          )}

          {/*cta*/}

          {/*stats*/}
          {stats && stats.length !== 0 && (
            <div className="mt-8 sxl:mt-24 hidden md:block">
              <Stats stats={stats} />
            </div>
          )}
        </div>

        {/*cutout image*/}
        <div className="relative hidden aspect-square sxl:w-[50%] w-[40%] md:block">
          <Image
            alt="TMA Cutout"
            className="object-cover"
            fill
            priority
            src={cutoutSrc}
            unoptimized
          />
        </div>

        {/* mobile cutout image + stats*/}
        <div className="flex md:hidden">
          <div className="w-[40%]">
            {stats && stats.length !== 0 && (
              <div className="my-4">
                <Stats stats={stats} />
              </div>
            )}
          </div>
          {/*cutout image*/}
          <div className="relative aspect-square w-[60%]">
            <Image
              alt="TMA Cutout"
              className="object-cover"
              fill
              priority
              src={cutoutSrc}
              unoptimized
            />
          </div>
        </div>
      </div>
    </Box>
  );
}

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
