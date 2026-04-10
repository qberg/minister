import { Badge } from "@repo/design-system/components/ui/badge";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import type { TypedLocale } from "payload";
import { ImagePreview } from "@/components/image-preview";
import type { LatestUpdateItem } from "@/types";
import { getFileUrl } from "@/lib/payload-media-utils";

type Props = {
  items: LatestUpdateItem[];
  locale: TypedLocale;
};

// const AnnouncementsGrid = ({ items, locale }: Props) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-4 lg:grid-cols-4 2xl:grid-cols-4">
//     {items.map((item, index) => (
//       <Card className="min-h-40 max-w-lg border-border" interactive>
//         <ImagePreview
//           src="/images/minister.png"
//           tagLabel="Alandur"
//           uniqueId="q2e4"
//         />
//         <CardContent>
//           <Badge>Badge</Badge>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// );



const AnnouncementsGrid = ({ items, locale }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-4 lg:grid-cols-4 2xl:grid-cols-4">
    {items.map((item, index) => (
      <Card key={`${index}-${item.id}`} className="min-h-40 max-w-lg border-border pt-0" interactive>
        {(item.fileType === "image" || item.fileType === "file") && (
          <ImagePreview
            src={item.fileType === "image" ? getFileUrl(item.image):getFileUrl(item.file)}
            uniqueId={`${index}-${item.id}`}
            fileType={item.fileType}
            title={item.title}
          />
        )}
        <CardContent className="ml-2 lg:ml-0">
          <Badge>{item.badge || "TM Anbarasan"}</Badge>
        </CardContent>
      </Card>
    ))}
  </div>
)

export default AnnouncementsGrid;