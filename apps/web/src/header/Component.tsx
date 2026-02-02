import type { TypedLocale } from "payload";
import { getCachedGlobal } from "@/lib/get-globals";
import type { Header as HeaderData } from "@/payload-types";
import { HeaderClient } from "./Component.client";

type Props = {
  locale?: TypedLocale;
};

export async function Header({ locale }: Props) {
  const headerData: HeaderData = await getCachedGlobal("header", locale, 1)();

  return <HeaderClient data={headerData} />;
}
