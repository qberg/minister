import type {
  Article,
  MapZone,
  Media,
  Document,
  NewsFeat,
  Announcement,
  Page,
  TabbedContentBlock,
  Tag,
  TimelineBlock,
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

export type LatestUpdatesCollections = Announcement | NewsFeat | Article;

export type SelectedCollectionFields = Pick<
  LatestUpdatesCollections,
  "id" | "title" | "publishedDate" | "externalLink"
> & {
  image: Media | null;
  tags: Tag | null;
  newspaper?: string | null;
  linkType?: ('internal' | 'external') | null;
  fileType?: ('image' | 'file') | null;
  file?: (number | null) | Document;
  badge?: string | null;
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
  badge?: string | null;
  newspaper?: string | null;
  fileType?: "image" | "file" | null,
  file?: (number | null) | Document;
  externalLink?: string | null;
};

export type OrgInfoTabItem = NonNullable<TabbedContentBlock["tabs"]>[number];
export type TimelineItem = NonNullable<TimelineBlock["items"]>[number];

export type MapZoneData = {
  slug: string;
  type: string;
  d: string;
};

export type MapZoneOption = Pick<MapZone, "name" | "slug" | "type" | "image">;

export type RawImpactAggregateRow = {
  issueId: number;
  issueSlug: string;
  issueName: string | null;
  issueColor: string | null;
  iconFilename: string | null;
  activityCount: string;
  totalAmount: string;
};

export type IssueCardStat = {
  id: string;
  name: string;
  slug: string;
  activityCount: number;
  totalAmount?: number;
  imageSrc?: string | null;
  color?: string;
  order?: number | null;
};

export type AllImpactStats = {
  totalActivities: number;
  totalAmount: number;
  totalIssues: number;
  issuesBreakdown: IssueCardStat[];
};
export type AnimeScrollSectionData = {
  id: string;
  title: string;
};

export type GalleryImageItem = {
  id: string | number;
  image: Media;
  caption?: string | null;
  location?: string | null;
  width: number;
  height: number;
};
