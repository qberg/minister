import type { Header as HeaderData } from "@/payload-types";
import { HeaderClient } from "./Component.client";
import { getCachedGlobal } from "@/lib/get-globals";

export async function Header() {
  const headerData: HeaderData = await getCachedGlobal("header", 1)();

  return <HeaderClient data={headerData} />;
}
