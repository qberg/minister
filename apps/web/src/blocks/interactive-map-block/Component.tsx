"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Button } from "@repo/design-system/components/ui/button";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useTranslations } from "@repo/i18n";
import { Link } from "@repo/i18n/navigation";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";
import type { TypedLocale } from "payload";
import { useEffect, useMemo, useState } from "react";
import { getMapStats } from "@/app/actions/get-map-stats";
import { getMapZones } from "@/app/actions/map";
import { AlandurMap } from "@/components/alandur-map";
import { ZoneCombobox } from "@/components/alandur-map/zone-combobox";
import { AnimatedHeading } from "@/components/animated-heading";
import AnimatedStat from "@/components/animated-stat";
import BackgroundImage from "@/components/background-image";
import { buildHref } from "@/components/cms-link";
import Heading from "@/components/heading";
import { PerspectiveCarousel } from "@/components/perspective-carousel";
import { SimpleIssueCard } from "@/components/simple-issue-card";
import type { InteractiveMapBlock as InteractiveMapBlockProps } from "@/payload-types";
import type { AllImpactStats, MapZoneOption } from "@/types";

type Props = {
  locale: TypedLocale;
  block: InteractiveMapBlockProps;
};

// biome-ignore lint: need
function InteractiveMapBlock({ locale, block }: Props) {
  const heading = block.headline;
  const title = block.title;
  const description = block.description;

  const mode = block.mode;

  const [activeSlug, setActiveSlug] = useQueryState(
    "zone",
    parseAsString.withOptions({ shallow: true, history: "replace" })
  );

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
    for (const z of zones) {
      if (z.slug) {
        lookup[z.slug] = z.name;
      }
    }
    return lookup;
  }, [zones]);

  const handleZoneToggle = (slug: string) => {
    const nextSlug = slug === activeSlug ? null : slug;
    setActiveSlug(nextSlug);
  };

  const baseLink = block.knowMoreLink
    ? buildHref(block.knowMoreLink)
    : "/real-results-alandur";
  const knowMoreHref = activeSlug ? `${baseLink}?zone=${activeSlug}` : baseLink;

  const t = useTranslations("IntMap");

  const headingText = activeSlug
    ? t("heading_zone", { zone: zoneNameLookup[activeSlug] })
    : t("heading_default");

  return (
    <>
      <Box
        as="section"
        className={cn(
          "relative",
          mode === "full" ? "theme-dark bg-primary" : "theme-light"
        )}
        invert
        overflow="hidden"
      >
        {mode === "full" && <BackgroundImage src="/map-bg.png" />}
        {mode === "summary" && (
          <div className="absolute top-20 left-0 aspect-square w-[75%] md:top-16 md:w-[50%]">
            <Image
              alt="Bg Pattern"
              className="object-contain"
              fill
              loading="lazy"
              src={"/pattern.svg"}
            />
          </div>
        )}
        <Stack
          className={cn("relative z-10", mode === "full" ? "mt-[6vw]" : "")}
        >
          {heading && mode === "summary" && <Heading text={heading} />}

          {/*map with combobox*/}
          <div className="relative flex flex-col gap-4 md:flex-row">
            {/*mobile title*/}
            {title && (
              <Typography
                as="h4"
                className="md:hidden"
                intent={"title"}
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
                  className="hidden md:block"
                  intent={"title"}
                  variant="headingXS"
                >
                  {title}
                </Typography>
              )}

              {description && (
                <Typography as="p" intent={"subtle"} variant="headingXXS">
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
        </Stack>
      </Box>
      <Box as="section" invert>
        <Stack>
          <Stack className="">
            <AnimatedHeading
              className="text-primary leading-[120%]"
              text={headingText}
            />

            <div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-2xl bg-black md:grid-cols-3">
              <BackgroundImage src="/images/stat-bg-dot.png" />
              <AnimatedStat
                isLoading={isLoadingStats}
                label={t("stat_label_one")}
                type="currency"
                value={stats?.totalAmount || 0}
              />
              <AnimatedStat
                isLoading={isLoadingStats}
                label={t("stat_label_two")}
                value={stats?.totalActivities || 0}
              />

              <AnimatedStat
                isLoading={isLoadingStats}
                label={t("stat_label_three")}
                value={stats?.totalIssues || 0}
              />
            </div>
            {/*issue cards max 8*/}
            {stats &&
              stats.issuesBreakdown.length > 0 &&
              mode === "summary" && (
                <div className="mt-12">
                  <PerspectiveCarousel
                    autoplay={true}
                    issues={stats.issuesBreakdown}
                    label={t("perspective_card_label")}
                    showNavigation={true}
                    showPagination={true}
                    spaceBetween={40}
                  />
                </div>
              )}
          </Stack>

          {/* Add Know More button in summary mode */}
          {mode === "summary" && block.knowMoreLink && (
            <div className="flex w-full items-center justify-center">
              <Button>
                <Link
                  className="your-button-classes"
                  href={knowMoreHref || "/real-results-alandur"}
                >
                  {t("cta_label")}
                </Link>
              </Button>
            </div>
          )}

          {mode === "full" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {stats?.issuesBreakdown.map((issue) => (
                <SimpleIssueCard
                  data={issue}
                  key={issue.id}
                  label={t("simple_card_label")}
                />
              ))}
            </div>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default InteractiveMapBlock;
