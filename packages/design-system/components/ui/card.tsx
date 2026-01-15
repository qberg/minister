import { cn } from "../../lib/utils";
import { HTMLMotionProps, motion } from "motion/react";
import React from "react";

type CardProps = HTMLMotionProps<"article"> & {
  interactive?: boolean;
};

function Card({ className, interactive, ...props }: CardProps) {
  return (
    <motion.article
      data-slot="card"
      className={cn(
        "group flex flex-col border border-transparent overflow-hidden bg-background",
        "px-0 py-2 lg:p-3 4xl:p-6 gap-8",
        interactive && [
          "cursor-pointer",
          "transition-colors duration-200 ease-out",
          "hover:bg-card-muted",
        ],
        className,
      )}
      whileHover={interactive ? { scale: 1, y: -5 } : {}}
      transition={
        interactive
          ? {
              type: "spring",
              stiffness: 400,
              damping: 25,
            }
          : {}
      }
      {...props}
    />
  );
}

type CardImageProps = HTMLMotionProps<"div">;

function CardImage({ className, ...props }: CardImageProps) {
  return (
    <motion.div
      data-slot="card-image"
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-3 4xl:gap-6", className)}
      {...props}
    />
  );
}

export { Card, CardImage, CardContent };
