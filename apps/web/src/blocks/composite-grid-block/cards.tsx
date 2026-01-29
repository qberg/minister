import { Button } from "@repo/design-system/components/ui/button";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { CMSLink } from "@/components/cms-link";
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

  if (!imageSrc) {
    return null;
  }

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
    <div className="relative z-20 flex h-full flex-col justify-center gap-8 4xl:p-12 p-6 lg:p-8">
      <Typography as="h4" className="text-secondary" variant="headingSM">
        {data.contentCard?.title}
      </Typography>

      <Typography as="p" intent="subtle" variant="bodyLG">
        {data.contentCard?.text}
      </Typography>

      {data.contentCard?.link && (
        <CMSLink {...data.contentCard?.link}>
          <Button variant={"outline"}>{data.contentCard.link.label}</Button>
        </CMSLink>
      )}
    </div>
  </div>
);

export { ImageCard, ContentCard };
