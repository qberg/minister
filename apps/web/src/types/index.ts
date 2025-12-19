import type {
  Article,
  Media,
  NewsFeat,
  Page,
  Tag,
  User,
} from "@/payload-types";

export type UserRole = NonNullable<User["roles"]>[number];

/* slug pages */
export type HeroBlock = NonNullable<Page["hero"]>[number];
export type LayoutBlock = NonNullable<Page["layout"]>[number];

export type StickyStatsVariant = "midnight" | "blue" | "light";

/* latest updates block */
export type LatestUpdatesBlockType = Extract<
  LayoutBlock,
  { blockType: "latest-updates" }
>;

export type LatestUpdatesCollections = NewsFeat | Article;

export type SelectedCollectionFields = Pick<
  LatestUpdatesCollections,
  "id" | "title" | "publishedDate" | "newspaper" | "externalLink"
> & {
  image: Media | null;
  tags: Tag | null;
};

export type MediaPreview = Pick<Media, "url" | "alt"> & {
  blurUrl?: string;
};
export type TagPreview = Pick<Tag, "slug" | "label">;

export type LatestUpdateItem = {
  id: number;
  title: string;
  publishedDate: string;
  image: MediaPreview | null;
  tags: TagPreview | null;
  newspaper?: string | null;
  externalLink?: string | null;
};
