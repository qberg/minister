import { ImagePreview } from "@/components/image-preview";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Card, CardContent } from "@repo/design-system/components/ui/card";

const ArticlesGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4">
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

export default ArticlesGrid;
