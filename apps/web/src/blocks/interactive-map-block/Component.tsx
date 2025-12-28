"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import { useEffect, useMemo, useState } from "react";
import { getMapStats } from "@/app/actions/get-map-stats";
import { getMapZones } from "@/app/actions/map";
import { AlandurMap } from "@/components/alandur-map";
import { ZoneCombobox } from "@/components/alandur-map/zone-combobox";
import { AnimatedHeading } from "@/components/animated-heading";
import AnimatedStat from "@/components/animated-stat";
import BackgroundImage from "@/components/background-image";
import Heading from "@/components/heading";
import { IssueCarouselEmbla } from "@/components/issue-carousel-embla";
import { PerspectiveCarousel } from "@/components/perspective-carousel";
import type { InteractiveMapBlock as InteractiveMapBlockProps } from "@/payload-types";
import type { AllImpactStats, MapZoneOption } from "@/types";

type Props = {
  locale: TypedLocale;
  block: InteractiveMapBlockProps;
};

function InteractiveMapBlock({ locale, block }: Props) {
  const heading = block.headline;
  const title = block.title;
  const description = block.description;

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [zones, setZones] = useState<MapZoneOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState<AllImpactStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      const data = await getMapZones(locale);

      if (isMounted) {
        setZones(data);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      setIsLoadingStats(true);

      const statsData = await getMapStats(activeSlug);

      if (isMounted) {
        setStats(statsData);
        setIsLoadingStats(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [activeSlug]);

  const zoneNameLookup = useMemo(() => {
    const lookup: Record<string, string> = {};
    zones.forEach((z) => (lookup[z.slug] = z.name));
    return lookup;
  }, [zones]);

  const handleZoneToggle = (slug: string) => {
    const nextSlug = slug === activeSlug ? null : slug;
    setActiveSlug(nextSlug);
  };

  return (
    <Box as="section" className="" overflow="hidden">
      <Stack className="relative z-10">
        {heading && <Heading text={heading} />}

        {/*map with combobox*/}
        <div className="flex flex-col gap-4 md:flex-row">
          {/*mobile title*/}
          {title && (
            <Typography
              as="h4"
              className="text-primary md:hidden"
              variant="headingXS"
            >
              {title}
            </Typography>
          )}
          {/*map*/}
          <div className="relative flex w-full items-center justify-center md:w-4/6 md:p-8 lg:min-h-[500px]">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                <p className="mt-4 animate-pulse font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Loading Map Data...
                </p>
              </div>
            )}

            {/* The Actual Map */}
            {!isLoading && zones.length > 0 && (
              <AlandurMap
                activeZoneSlug={activeSlug}
                className="h-full w-full"
                onZoneSelect={handleZoneToggle}
                zoneNames={zoneNameLookup}
              />
            )}
          </div>

          <div className="flex w-full flex-col justify-center gap-4 md:w-2/6 lg:gap-8">
            {title && (
              <Typography
                as="h4"
                className="hidden text-primary md:block"
                variant="headingXS"
              >
                {title}
              </Typography>
            )}

            {description && (
              <Typography
                as="p"
                className="text-teritary-foreground"
                variant="headingXXS"
              >
                {description}
              </Typography>
            )}

            {/*search combobox*/}

            <ZoneCombobox
              activeSlug={activeSlug}
              isLoading={isLoading}
              onSelect={handleZoneToggle}
              zones={zones}
            />
          </div>
        </div>

        <Stack className="">
          <AnimatedHeading
            className="text-primary leading-[120%]"
            text={
              activeSlug
                ? `Impact on ${zoneNameLookup[activeSlug]}`
                : "All Impact on Alandur"
            }
          />

          <div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-2xl bg-black md:grid-cols-3">
            <BackgroundImage src="/images/stat-bg-dot.png" />
            <AnimatedStat
              isLoading={isLoadingStats}
              label="Amount Spent"
              type="currency"
              value={stats?.totalAmount || 0}
            />
            <AnimatedStat
              isLoading={isLoadingStats}
              label="Development Activities"
              value={stats?.totalActivities || 0}
            />

            <AnimatedStat
              isLoading={isLoadingStats}
              label="Issues Addressed"
              value={stats?.totalIssues || 0}
            />
          </div>
          {/*issue cards max 8*/}
          {stats && stats.issuesBreakdown.length > 0 && (
            <div className="mt-12">
              <PerspectiveCarousel
                autoplay={true}
                issues={stats.issuesBreakdown}
                showNavigation={false}
                showPagination={true}
                spaceBetween={40}
              />
            </div>
          )}

          {stats && stats.issuesBreakdown.length > 0 && (
            <div className="4xl:-mx-48 lxl:-mx-36 -mx-6 sxl:-mx-24 md:-mx-10 lg:-mx-20 mt-12 w-screen">
              <IssueCarouselEmbla
                autoplay={true}
                issues={stats.issuesBreakdown}
                loop={true}
                showNavigation={true}
                showPagination={true}
              />
            </div>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default InteractiveMapBlock;
