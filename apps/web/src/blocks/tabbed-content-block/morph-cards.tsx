"use client";

import { Typography } from "@repo/design-system/components/ui/typography";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import BackgroundImage from "@/components/background-image";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { OrgInfoTabItem } from "@/types";

function MorphCards({ items }: { items: OrgInfoTabItem[] }) {
  const [selectedId, setSelectedId] = useState<string>(items[0].id || "");

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative block min-h-[95vh] md:hidden">
      {/* card which has changed fully */}
      <div className="relative h-[80vh]">
        <AnimatePresence mode="sync">
          {items.map(
            (card) =>
              card.id === selectedId && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className={
                    "absolute inset-0 rounded-3xl border border-alt-border"
                  }
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      restDelta: 0.01,
                    },
                    opacity: { duration: 0.1 },
                  }}
                >
                  {/*card content heree*/}
                  <div className="relative z-10 flex h-full flex-col gap-4 p-4">
                    <div className="flex items-center gap-4">
                      <motion.div className="relative aspect-square w-12 overflow-hidden rounded-full">
                        <Image
                          alt="Org Photo"
                          className="object-cover"
                          fill
                          src={getMediaUrl(card.logo)}
                        />
                      </motion.div>

                      <Typography
                        as="h4"
                        className="text-yellow-400"
                        variant="brandHeading"
                      >
                        {card.label}
                      </Typography>
                    </div>

                    {/*desc*/}

                    <Typography
                      as="div"
                      className="text-muted-foreground"
                      variant="bodyLG"
                    >
                      {card.description}
                    </Typography>

                    {/*stat*/}
                    <div className="grid grid-cols-2">
                      {card.stats.map((stat) => (
                        <div key={stat.id}>
                          <Typography
                            as="h2"
                            className="mb-1 text-accent"
                            variant="headingLG"
                          >
                            {stat.v}
                          </Typography>
                          <Typography
                            as="p"
                            className="text-neutral-200"
                            variant="bodyLG"
                          >
                            {stat.l}
                          </Typography>
                        </div>
                      ))}
                    </div>
                    {/*image*/}
                    <div className="relative w-full flex-1 overflow-hidden rounded-2xl">
                      <Image
                        alt="Org Image"
                        className="object-cover"
                        fill
                        src={getMediaUrl(card.image)}
                        unoptimized
                      />
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/*thumbnails*/}
      <div className="-mx-2 absolute right-0 bottom-0 left-0 flex gap-3 overflow-x-auto overflow-y-hidden">
        {items.map(
          (card) =>
            card.id !== selectedId && (
              <motion.div
                className={
                  "relative flex aspect-square min-w-[20vw] flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-alt-border p-4"
                }
                key={card.id}
                layoutId={`card-${card.id}`}
                onClick={() => setSelectedId(card.id || "")}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    restDelta: 0.01,
                  },
                }}
              >
                <BackgroundImage
                  alt="Org Image"
                  overlay="dark"
                  src={getMediaUrl(card.image)}
                />
                <motion.div className="relative aspect-square w-12 overflow-hidden rounded-full">
                  <Image
                    alt="Org Photo"
                    className="object-cover"
                    fill
                    src={getMediaUrl(card.logo)}
                  />
                </motion.div>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
}

export default MorphCards;
