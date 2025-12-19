import { ImagePreview } from "@/components/image-preview";
import type { LatestUpdateItem } from "@/types";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import type { TypedLocale } from "payload";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

const AnnouncementsGrid = ({ items, locale }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 md:gap-y-4">
      <Card interactive className="min-h-40 border-border max-w-lg">
        <ImagePreview
          src="/images/minister.png"
          uniqueId="q2e4"
          tagLabel="Alandur"
        />
        <CardContent>
          <Badge>Badge</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsGrid;
