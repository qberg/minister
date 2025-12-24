import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import AnimatedPattern from "@/components/animated-pattern";
import type { CompositeGridBlock as CompositeGridBlockProps } from "@/payload-types";

const cardVariants = cva(
  "relative w-full overflow-hidden rounded-lg md:rounded-2xl",
  {
    variants: {
      position: {
        "0": "aspect-[0.86/1] md:row-span-3",
        "1": "aspect-[1.33/1] md:row-span-2",
        "2": "aspect-[2.8/1] md:col-start-2 md:row-span-1",
        "3": "aspect-[0.86/1] md:col-start-3 md:row-span-3 md:row-start-1",
      },
    },
    defaultVariants: {
      position: "0",
    },
  }
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
      <Image alt="Image" className="object-cover" fill src={imageSrc} />
    </div>
  );
};

const ContentCard = ({ data, position, ...props }: CardProps) => (
  <div className={cn("bg-foreground", cardVariants({ position }))} {...props}>
    <AnimatedPattern className="absolute bottom-0 left-0 w-full" />
    <div className="flex flex-col gap-8 4xl:p-12 p-6 lg:p-8">
      <Typography as="h4" className="text-secondary" variant="brandHeading">
        {data.contentCard?.title}
      </Typography>

      <Typography as="p" className="text-primary-foreground" variant="bodyLG">
        {data.contentCard?.text}
      </Typography>
    </div>
  </div>
);

export { ImageCard, ContentCard };
