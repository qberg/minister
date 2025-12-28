"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Typography } from "@repo/design-system/components/ui/typography";
import { AnimatePresence, motion } from "motion/react";
import type { TypedLocale } from "payload";
import React, { useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Heading from "@/components/heading";
import type { SocialMediaBlock as SocialMediaBlockProps } from "@/payload-types";
import {
  getFacebookEmbedUrl,
  getTwitterHandle,
  normalizeInstagramUrl,
} from "@/utils";

type Props = {
  locale: TypedLocale;
  block: SocialMediaBlockProps;
};

function SocialMediaBlock({ block }: Props) {
  const heading = block.heading;
  const socialLinks = block.socialLinks ?? [];

  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    socialLinks[0]?.platform || ""
  );

  if (socialLinks.length === 0) {
    return null;
  }

  const activeSocial =
    socialLinks.find((s) => s.platform === selectedPlatform) || socialLinks[0];

  const renderSocialContent = (platform: string, url: string) => {
    const normalizedPlatform = platform.toLowerCase().trim();

    switch (normalizedPlatform) {
      case "facebook":
        return (
          <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-white">
            <iframe
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="h-full w-full max-w-[500px]"
              data-lenis-prevent
              src={getFacebookEmbedUrl(url)}
              title="Facebook"
            />
          </div>
        );

      case "instagram":
        return (
          <iframe
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="h-full w-full bg-white"
            data-lenis-prevent
            src={normalizeInstagramUrl(url)}
            title="Instagram"
          />
        );

      case "youtube":
        return (
          <iframe
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full bg-black"
            src={url}
            title="YouTube"
          />
        );

      case "linkedin":
        return (
          <iframe
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="h-full w-full bg-white"
            data-lenis-prevent
            src={url}
            title="LinkedIn"
          />
        );

      default:
        return (
          <iframe
            className="h-full w-full bg-white"
            src={url}
            title={platform}
          />
        );
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Box as="section">
      <Stack className="relative">
        {/* Section Heading */}
        {heading && <Heading text={heading} />}

        {/* Platform Tabs */}
        <Tabs
          className="mx-auto flex"
          onValueChange={setSelectedPlatform}
          value={activeSocial?.platform || ""}
        >
          <TabsList size="lg" variant="button">
            {socialLinks.map((social) => (
              <TabsTrigger key={social.platform} value={social.platform}>
                <Typography as="p" className="uppercase" variant="bodyMD">
                  {social.platform}
                </Typography>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Embed Container */}
        <div className="flex w-full md:justify-center">
          <div className="aspect-[0.85/1] w-full overflow-hidden rounded-t-2xl bg-secondary px-2 pt-2 md:aspect-[1.53/1] md:w-[70vw] md:rounded-t-[3vw] md:px-8 md:pt-8">
            <div className="h-full w-full overflow-hidden rounded-t-2xl md:rounded-t-[2vw]">
              <AnimatePresence mode="wait">
                {activeSocial && (
                  <motion.div
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    className="h-full w-full"
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                      y: 10,
                      filter: "blur(4px)",
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.98,
                      y: 10,
                      filter: "blur(4px)",
                    }}
                    key={activeSocial.platform}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {activeSocial.platform === "twitter" ? (
                      <TwitterTimelineWrapper url={activeSocial.url} />
                    ) : (
                      renderSocialContent(
                        activeSocial.platform,
                        activeSocial.url
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Stack>
    </Box>
  );
}

const TwitterTimelineWrapper = React.memo(({ url }: { url: string }) => (
  <div className="h-full w-full overflow-y-auto bg-white">
    <TwitterTimelineEmbed
      noFooter
      noHeader
      options={{ height: 600 }}
      screenName={getTwitterHandle(url)}
      sourceType="profile"
    />
  </div>
));
TwitterTimelineWrapper.displayName = "TwitterTimelineWrapper";

export default SocialMediaBlock;
