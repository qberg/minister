import { Badge } from "@repo/design-system/components/ui/badge";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import type { TypedLocale } from "payload";
import { ImagePreview } from "@/components/image-preview";
import type { LatestUpdateItem } from "@/types";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

const AnnouncementsGrid = ({ items, locale }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-4 lg:grid-cols-4 2xl:grid-cols-4">
    <Card className="min-h-40 max-w-lg border-border" interactive>
      <ImagePreview
        src="/images/minister.png"
        tagLabel="Alandur"
        uniqueId="q2e4"
      />
      <CardContent>
        <Badge>Badge</Badge>
      </CardContent>
    </Card>
  </div>
);

export default AnnouncementsGrid;
