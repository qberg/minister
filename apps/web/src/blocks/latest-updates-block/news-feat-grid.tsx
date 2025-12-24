import { Card } from "@repo/design-system/components/ui/card";
import type { TypedLocale } from "payload";
import { ImagePreview } from "@/components/image-preview";
import type { LatestUpdateItem } from "@/types";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

const NewsFeatGrid = ({ items, locale }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-4 lg:grid-cols-4 2xl:grid-cols-4">
    {items.map((item, index) => (
      <div
        className="md:border-border md:border-r md:px-1 2xl:px-2 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
        key={`${index}-${item.id}`}
      >
        <Card className="rounded-lg lg:rounded-2xl" interactive>
          <ImagePreview
            src={item.image?.url || "/images/minister.png"}
            tagLabel="Alandur"
            uniqueId={`${index}-${item.id}`}
          />
        </Card>
      </div>
    ))}
  </div>
);

export default NewsFeatGrid;
