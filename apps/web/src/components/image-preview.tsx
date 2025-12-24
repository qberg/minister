"use client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Badge } from "@repo/design-system/components/ui/badge";
import { useLockBodyScroll } from "@repo/design-system/hooks/use-lock-body-scroll";
import { X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useState } from "react";

const MotionImage = motion.create(Image);

type ImagePreviewProps = {
  src?: string;
  tagLabel?: string;
  uniqueId?: string;
};

export function ImagePreview({
  src,
  tagLabel,
  uniqueId = "",
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  useLockBodyScroll(isOpen);

  return (
    <div className="relative flex w-full flex-col rounded-lg lg:rounded-2xl">
      <MotionConfig
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 40,
        }}
      >
        <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
          <Dialog.Trigger asChild>
            <motion.div
              className="relative z-10 aspect-square w-full cursor-pointer"
              layoutId={`image-dialog-${uniqueId}`}
              role="button"
            >
              <MotionImage
                alt="Newspaper clippings"
                className="rounded-lg object-cover"
                fill
                layoutId={`image-${uniqueId}`}
                priority
                src={src}
                unoptimized
              />
              {tagLabel && (
                <motion.div
                  className="absolute top-3 left-3 z-20"
                  layoutId={`badge-${uniqueId}`}
                >
                  <Badge>{tagLabel}</Badge>
                </motion.div>
              )}
            </motion.div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <AnimatePresence initial={false} mode="sync">
              {isOpen && (
                <>
                  <Dialog.Overlay>
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="fixed inset-0 z-40 h-full w-full bg-black/50 backdrop-blur-xs"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                    />
                  </Dialog.Overlay>

                  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <Dialog.Content className="w-full lg:max-w-[56vw]">
                      <VisuallyHidden>
                        <Dialog.Title>Image Preview</Dialog.Title>
                        <Dialog.Description>
                          Interaction built using shared layout animations
                        </Dialog.Description>
                      </VisuallyHidden>

                      <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-[1.33/1] w-full overflow-hidden rounded-2xl"
                        exit={{ opacity: 0, scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        layoutId={`image-dialog-${uniqueId}`}
                      >
                        <MotionImage
                          alt="newspaper clippings"
                          className="select-none rounded-2xl object-cover"
                          fill
                          layoutId={`image-${uniqueId}`}
                          sizes="100%"
                          src={src}
                          unoptimized
                        />
                        {tagLabel && (
                          <motion.div
                            className="absolute top-3 left-3"
                            layoutId={`badge-${uniqueId}`}
                          >
                            <Badge>{tagLabel}</Badge>
                          </motion.div>
                        )}

                        <Dialog.Close asChild>
                          <motion.button
                            animate={{ opacity: 1, scale: 1 }}
                            aria-label="Close dialog"
                            className="absolute top-3 right-3 z-10 h-fit w-fit rounded-full border border-white/20 bg-white/20 p-[6px] backdrop-blur hover:bg-white/50 focus-visible:outline-none"
                            exit={{ opacity: 0, scale: 0.8 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            type="button"
                          >
                            <X color="white" size={20} />
                          </motion.button>
                        </Dialog.Close>
                      </motion.div>
                    </Dialog.Content>
                  </div>
                </>
              )}
            </AnimatePresence>
          </Dialog.Portal>
        </Dialog.Root>
      </MotionConfig>
    </div>
  );
}
