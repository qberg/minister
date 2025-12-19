import AnimatedPattern from "@/components/animated-pattern";
import type { CompositeGridBlock as CompositeGridBlockProps } from "@/payload-types";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const cardVariants = cva(
  "rounded-lg md:rounded-2xl overflow-hidden w-full relative",
  {
    variants: {
      position: {
        "0": "md:row-span-3 aspect-[0.86/1]",
        "1": "md:row-span-2 aspect-[1.33/1]",
        "2": "md:row-span-1 md:col-start-2 aspect-[2.8/1]",
        "3": "md:row-span-3 md:row-start-1 md:col-start-3 aspect-[0.86/1]",
      },
    },
    defaultVariants: {
      position: "0",
    },
  },
);

interface CardProps extends VariantProps<typeof cardVariants> {
  data: NonNullable<CompositeGridBlockProps["items"]>[number];
}

const ImageCard = ({ data, position, ...props }: CardProps) => {
  if (data.cardType !== "image" || !data.imageCard?.image) {
    return null;
  }

  const imageSrc =
    typeof data.imageCard.image === "object" ? data.imageCard.image.url : "";

  return (
    <div
      className={cn("relative w-full", cardVariants({ position }))}
      {...props}
    >
      <Image src={imageSrc} alt="Image" fill className="object-cover" />
    </div>
  );
};

const ContentCard = ({ data, position, ...props }: CardProps) => {
  return (
    <div className={cn("bg-foreground", cardVariants({ position }))} {...props}>
      <AnimatedPattern className="absolute bottom-0 left-0 w-full" />
      <div className="p-6 lg:p-8 4xl:p-12 flex flex-col gap-8">
        <Typography as="h4" variant="brandHeading" className="text-secondary">
          {data.contentCard?.title}
        </Typography>

        <Typography as="p" variant="bodyLG" className="text-primary-foreground">
          {data.contentCard?.text}
        </Typography>
      </div>
    </div>
  );
};

export { ImageCard, ContentCard };
