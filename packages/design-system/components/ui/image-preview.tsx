import { AnimatePresence, HTMLMotionProps, MotionConfig } from "motion/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "radix-ui";
import { motion } from "motion/react";
import React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

type ImagePreviewContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
};

const ImagePreviewContext =
  React.createContext<ImagePreviewContextValue | null>(null);

function useImagePreview() {
  const context = React.useContext(ImagePreviewContext);

  if (!context) {
    throw new Error(
      "ImagePreview components must be used within the ImagePreviewRoot",
    );
  } else {
    return context;
  }
}

type ImagePreviewRootProps = {
  children: React.ReactNode;
  uniqueId: string;
};

function ImagePreviewRoot({ children, uniqueId }: ImagePreviewRootProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ImagePreviewContext.Provider value={{ isOpen, setIsOpen, uniqueId }}>
      <MotionConfig
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
      >
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          {children}
        </Dialog.Root>
      </MotionConfig>
    </ImagePreviewContext.Provider>
  );
}

type ImagePreviewTriggerProps = HTMLMotionProps<"div">;

function ImagePreviewTrigger({
  className,
  children,
  ...props
}: ImagePreviewTriggerProps) {
  const { uniqueId } = useImagePreview();

  return (
    <Dialog.Trigger asChild>
      <motion.div
        layoutId={`preview-dialog-${uniqueId}`}
        className={cn(
          "relative aspect-square w-full cursor-pointer rounded-2xl overflow-hidden",
          className,
        )}
        role="button"
        aria-label="Preview Image"
        {...props}
      >
        {children}
      </motion.div>
    </Dialog.Trigger>
  );
}

type ImagePreviewMediaProps = {
  children: React.ReactNode;
  className?: string;
};

function ImagePreviewMedia({ children, className }: ImagePreviewMediaProps) {
  const { uniqueId } = useImagePreview();

  return (
    <motion.div
      layoutId={`preview-image-${uniqueId}`}
      className={cn("w-full h-full", className)}
    >
      {children}
    </motion.div>
  );
}

type ImagePreviewPortalProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

function ImagePreviewPortal({
  children,
  title,
  description,
  className,
}: ImagePreviewPortalProps) {
  const { uniqueId } = useImagePreview();

  return (
    <Dialog.Portal>
      <AnimatePresence initial={false} mode="sync">
        <Dialog.Overlay asChild>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        <div
          key="content"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Dialog.Content className="w-full max-w-[56vw]">
            <VisuallyHidden>
              <Dialog.Title>{title || "Image Preview"}</Dialog.Title>
              <Dialog.Description>
                {description || "Full size image preview"}
              </Dialog.Description>
            </VisuallyHidden>

            <motion.div
              layoutId={`preview-dialog-${uniqueId}`}
              className={cn(
                "relative w-full overflow-hidden rounded-2xl",
                className,
              )}
            >
              <motion.div layoutId={`preview-image-${uniqueId}`}>
                {children}
              </motion.div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close preview"
                  className="absolute top-3 right-3 z-10 rounded-full border border-white/20 bg-white/20 p-2 backdrop-blur hover:bg-white/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={20} className="text-white" />
                </button>
              </Dialog.Close>
            </motion.div>
          </Dialog.Content>
        </div>
      </AnimatePresence>
    </Dialog.Portal>
  );
}

export {
  ImagePreviewRoot,
  ImagePreviewTrigger,
  ImagePreviewMedia,
  ImagePreviewPortal,
};
