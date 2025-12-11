import { Box } from "@repo/design-system/components/layout/box";
import { Typography } from "@repo/design-system/components/ui/typography";
import { getTranslations } from "@repo/i18n/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  return (
    <div className="min-h-screen overflow-hidden">
      <h1 className="whitespace-nowrap font-normal font-times-new-roman text-9xl leading-none tracking-normal">
        {t("title")}
      </h1>

      <Box borderWidth="thin">
        <Typography as="h1">T. M. Anbarasan</Typography>
      </Box>
    </div>
  );
}
