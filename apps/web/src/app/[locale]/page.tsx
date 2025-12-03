import { getTranslations } from "@repo/i18n/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  return (
    <div className="min-h-screen">
      <h1 className="font-times-new-roman">{t("title")}</h1>
    </div>
  );
}
