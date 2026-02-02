import { redirect } from "@repo/i18n/navigation";
import type { TypedLocale } from "payload";

type Props = {
  params: Promise<{ locale: TypedLocale }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  redirect({ href: "/home", locale });
}
