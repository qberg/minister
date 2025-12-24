import { Badge } from "@repo/design-system/components/ui/badge";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import { Lens } from "@repo/design-system/components/ui/lens";
import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import type { TypedLocale } from "payload";
import type { LatestUpdateItem } from "@/types";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

const ArticlesGrid = ({ items, locale }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-4 lg:grid-cols-4 2xl:grid-cols-4">
    {items.map((item, index) => (
      <a
        className="md:border-border md:border-r md:px-1 2xl:px-2 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
        href={item.externalLink || "https://exampleeee.com"}
        key={`${index}-${item.id}`}
        rel="noreferrer noopener"
        target="_blank"
      >
        <Card className="rounded-lg lg:rounded-2xl" interactive>
          <Lens>
            <Image
              alt={item.image?.alt || "Article Feature Image"}
              className="object-cover"
              height={500}
              priority
              sizes="(max-width:767px) 100vw, (min-width:768px) 33vw"
              src={item.image?.url || "/images/minister.png"}
              unoptimized
              width={500}
            />
          </Lens>

          <CardContent>
            <Badge>{item.tags?.label}</Badge>
            <Typography
              as="p"
              className="text-teritary-foreground"
              variant="bodyMD"
            >
              {item.publishedDate}
            </Typography>

            <Typography as="h5" className="text-primary" variant="headingXS">
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      </a>
    ))}
  </div>
);

export default ArticlesGrid;
