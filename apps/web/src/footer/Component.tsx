import { Box } from "@repo/design-system/components/layout/box";
import BackgroundImage from "@/components/background-image";
import { getCachedGlobal } from "@/lib/get-globals";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { Footer as FooterData } from "@/payload-types";

export async function Footer() {
  const footerData: FooterData = await getCachedGlobal("footer", 1)();

  const bgImageSrc = getMediaUrl(footerData.bgImg);

  return (
    <Box as="footer" className="relative min-h-[60vh] bg-surface">
      {bgImageSrc && (
        <BackgroundImage className="opacity-10" src={bgImageSrc} />
      )}
    </Box>
  );
}
