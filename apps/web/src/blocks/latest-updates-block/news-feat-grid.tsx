import { ImagePreview } from "@/components/image-preview";
import type { LatestUpdateItem } from "@/types";
import { Card } from "@repo/design-system/components/ui/card";
import type { TypedLocale } from "payload";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

const NewsFeatGrid = ({ items, locale }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 md:gap-y-4">
      {items.map((item, index) => (
        <div
          key={`${index}-${item.id}`}
          className="md:border-border md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(2n)]:border-r md:px-1 2xl:px-2"
        >
          <Card interactive className="rounded-lg lg:rounded-2xl">
            <ImagePreview
              src={item.image?.url || "/images/minister.png"}
              uniqueId={`${index}-${item.id}`}
              tagLabel="Alandur"
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default NewsFeatGrid;
