"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import { useEffect, useMemo, useState } from "react";
import { getMapZones } from "@/app/actions/map";
import { AlandurMap } from "@/components/alandur-map";
import Heading from "@/components/heading";
import type { InteractiveMapBlock as InteractiveMapBlockProps } from "@/payload-types";
import type { MapZoneOption } from "@/types";

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

  const zoneNameLookup = useMemo(() => {
    const lookup: Record<string, string> = {};
    zones.forEach((z) => (lookup[z.name] = z.name));
    return lookup;
  }, [zones]);

  const handleZoneToggle = (slug: string) => {
    const nextSlug = slug === activeSlug ? null : slug;
    setActiveSlug(nextSlug);
  };

  return (
    <Box as="section" className="min-h-screen" overflow="visible">
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
          <div className="relative flex w-full items-center justify-center md:w-4/6 md:p-8">
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

            {/* Empty State Fallback */}
            {!isLoading && zones.length === 0 && (
              <p className="text-gray-400 text-sm">No map data available.</p>
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
          </div>
        </div>
      </Stack>
    </Box>
  );
}

export default InteractiveMapBlock;
