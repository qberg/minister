"use client";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Badge } from "@repo/design-system/components/ui/badge";
import { useLockBodyScroll } from "@repo/design-system/hooks/use-lock-body-scroll";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

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
    <div className="relative flex w-full flex-col rounded-2xl">
      <MotionConfig
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
      >
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <motion.div
              layoutId={`image-dialog-${uniqueId}`}
              className="relative z-10 aspect-square w-full cursor-pointer"
              role="button"
            >
              <MotionImage
                layoutId={`image-${uniqueId}`}
                src={src}
                alt="Newspaper clippings"
                fill
                priority
                sizes="100%"
                className="rounded-lg object-cover"
              />
              {tagLabel && (
                <motion.div
                  layoutId={`badge-${uniqueId}`}
                  className="absolute top-3 left-3 z-20"
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
                      className="fixed inset-0 z-40 h-full w-full backdrop-blur-xs bg-black/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
                        layoutId={`image-dialog-${uniqueId}`}
                        className="relative aspect-[1.33/1] w-full overflow-hidden rounded-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <MotionImage
                          layoutId={`image-${uniqueId}`}
                          src={src}
                          alt="newspaper clippings"
                          fill
                          sizes="100%"
                          className="rounded-2xl object-cover select-none"
                        />
                        {tagLabel && (
                          <motion.div
                            layoutId={`badge-${uniqueId}`}
                            className="absolute top-3 left-3"
                          >
                            <Badge>{tagLabel}</Badge>
                          </motion.div>
                        )}

                        <Dialog.Close asChild>
                          <motion.button
                            type="button"
                            aria-label="Close dialog"
                            className="absolute top-3 right-3 z-10 h-fit w-fit rounded-full border border-white/20 bg-white/20 p-[6px] backdrop-blur hover:bg-white/50 focus-visible:outline-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.1 }}
                          >
                            <X size={20} color="white" />
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
