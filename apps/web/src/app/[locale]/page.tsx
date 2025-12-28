import { Box } from "@repo/design-system/components/layout/box";
import { Typography } from "@repo/design-system/components/ui/typography";
import { getTranslations } from "@repo/i18n/server";
import { WalletGallery } from "@/components/wallet";
import { Skiper23 } from "@/components/wallet-expand";
import { HomePreloader } from "./_components/home-preloader";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <HomePreloader>
      <main className="min-h-screen w-full overflow-hidden bg-[#f4f4f4] text-stone-900">
        {/* Hero Section */}
        <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-10">
          <div className="w-full max-w-7xl">
            {/* Huge Headline */}
            <h1 className="font-times-new-roman text-[12vw] leading-[0.8] tracking-tighter opacity-90 mix-blend-multiply">
              {t("title") || "VISIONARY"}
            </h1>

            <div className="mt-8 flex w-full justify-between border-stone-300 border-t pt-4">
              <Typography
                as="span"
                className="text-xs uppercase tracking-widest"
              >
                Est. 2024
              </Typography>
              <Typography as="h2" className="font-medium text-xl">
                T. M. Anbarasan
              </Typography>
            </div>
          </div>
        </div>

        <WalletGallery />

        <Skiper23 />

        {/* Rest of page content... */}
        <Box className="h-[50vh] w-full bg-stone-200" />
      </main>
    </HomePreloader>
  );
}
