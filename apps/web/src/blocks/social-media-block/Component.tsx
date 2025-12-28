"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Typography } from "@repo/design-system/components/ui/typography";
import type { TypedLocale } from "payload";
import { useState } from "react";
import Heading from "@/components/heading";
import type { SocialMediaBlock as SocialMediaBlockProps } from "@/payload-types";

type Props = {
  locale: TypedLocale;
  block: SocialMediaBlockProps;
};

function SocialMediaBlock({ block }: Props) {
  const heading = block.heading;
  const socials = block.socialLinks || [];

  const [currentPlatform, setCurrentPlatform] = useState<string>(
    socials.length > 0 ? socials[0].platform : ""
  );

  const handleTabChange = (value: string) => {
    setCurrentPlatform(value);
  };

  if (socials.length === 0) {
    return null;
  }

  const currentSocial = socials.find((s) => s.platform === currentPlatform);

  return (
    <Box as="section">
      <Stack className="relative">
        {heading && <Heading text={heading} />}

        <Tabs
          className="mx-auto flex"
          onValueChange={handleTabChange}
          value={currentPlatform}
        >
          <TabsList size="lg" variant="button">
            {socials.map((social) => (
              <TabsTrigger key={social.platform} value={social.platform}>
                <Typography as="p" className="uppercase" variant="bodyMD">
                  {social.platform}
                </Typography>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex w-full md:justify-center">
          <div className="aspect-[1.5/1] w-full overflow-hidden rounded-t-2xl bg-secondary px-2 pt-2 md:w-[70vw] md:rounded-t-[3vw] md:px-8 md:pt-8">
            {currentSocial && (
              <iframe
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="h-full w-full rounded-t-2xl md:rounded-t-[2vw]"
                data-lenis-prevent
                src="https://www.instagram.com/thamoanbarasan/embed/"
                title={`${currentSocial.platform} profile`}
              />
            )}
          </div>
        </div>
      </Stack>
    </Box>
  );
}

export default SocialMediaBlock;
