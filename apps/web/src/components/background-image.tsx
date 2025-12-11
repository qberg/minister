import { cn } from "@repo/design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import type React from "react";

const overlayVariants = cva("absolute inset-0", {
  variants: {
    overlay: {
      none: "",
      dark: "bg-black/30",
      darker: "bg-black/60",
      gradient: "bg-gradient-to-b from-black/70 via-black/40 to-transparent",
      "gradient-bottom":
        "bg-gradient-to-t from-black/70 via-black/40 to-transparent",
    },
  },
  defaultVariants: {
    overlay: "none",
  },
});

export interface BackgroundImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof overlayVariants> {
  src: string;
  alt?: string;
  priority?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const BackgroundImage = ({
  src,
  alt,
  className,
  priority,
  overlay,
  ref,
  ...props
}: BackgroundImageProps) => (
  <div className={cn("absolute inset-0", className)} ref={ref} {...props}>
    <Image
      alt={alt || "Background Deco Image"}
      className="object-cover"
      fill
      priority={priority}
      sizes="100vw"
      src={src}
    />

    {overlay && overlay !== "none" && (
      <div aria-hidden="true" className={overlayVariants({ overlay })} />
    )}
  </div>
);

BackgroundImage.displayName = "BackgroundImage";

export default BackgroundImage;
export { overlayVariants };
