import type { LatestUpdateItem } from "@/types";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Lens } from "@repo/design-system/components/ui/lens";
import {
  Card,
  CardContent,
  CardImage,
} from "@repo/design-system/components/ui/card";
import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import type { TypedLocale } from "payload";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

const ArticlesGrid = ({ items, locale }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 md:gap-y-4">
      {items.map((item, index) => (
        <a
          href={item.externalLink || "https://exampleeee.com"}
          target="_blank"
          rel="noreferrer noopener"
          key={`${index}-${item.id}`}
          className="md:border-border md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(2n)]:border-r md:px-1 2xl:px-2"
        >
          <Card interactive className="rounded-lg lg:rounded-2xl">
            <Lens>
              <Image
                src={item.image?.url || "/images/minister.png"}
                alt={item.image?.alt || "Article Feature Image"}
                priority
                width={500}
                height={500}
                unoptimized
                className="object-cover"
                sizes="(max-width:767px) 100vw, (min-width:768px) 33vw"
              />
            </Lens>

            <CardContent>
              <Badge>{item.tags?.label}</Badge>
              <Typography
                as="p"
                variant="bodyMD"
                className="text-teritary-foreground"
              >
                {item.publishedDate}
              </Typography>

              <Typography as="h5" variant="headingXS" className="text-primary">
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default ArticlesGrid;
