import type { Page, User } from "@/payload-types";

export type UserRole = NonNullable<User["roles"]>[number];

/* slug pages */
export type HeroBlock = NonNullable<Page["hero"]>[number];
export type LayoutBlock = NonNullable<Page["layout"]>[number];

export type StickyStatsVariant = "midnight" | "blue" | "light";
