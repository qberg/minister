import type { TypedLocale } from "payload";
import { getCachedGlobal } from "@/lib/get-globals";
import type { Header as HeaderData } from "@/payload-types";
import { HeaderClient } from "./Component.client";

type Props = {
  locale?: TypedLocale;
  hasGallery?: boolean;
};

export async function Header({ locale, hasGallery = false }: Props) {
  const headerData: HeaderData = await getCachedGlobal("header", locale, 1)();

  return <HeaderClient data={headerData} hasGallery={hasGallery} />;
}
