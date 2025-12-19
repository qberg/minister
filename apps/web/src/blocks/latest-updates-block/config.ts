import type { Block } from "payload";

export const LatestUpdatesBlock: Block = {
  slug: "latest-updates",
  fields: [
    {
      name: "defType",
      type: "select",
      defaultValue: "announcements",
      required: true,
      options: [
        { label: "Announcements", value: "announcements" },
        { label: "Articles", value: "articles" },
        { label: "Newspaper Features", value: "news-feat" },
      ],
      admin: {
        description: "Which tab opens by default",
      },
    },
    {
      name: "showTags",
      type: "checkbox",
      defaultValue: true,
      label: "Show Tags Tabs after the main content tabs",
    },
    {
      name: "showCta",
      type: "checkbox",
      defaultValue: false,
      label: "Enable this to show CTA to latest updates page",
    },
    {
      name: "perPage",
      type: "number",
      defaultValue: 12,
      required: true,
      min: 12,
      max: 24,
      admin: {
        description: "Number of items to show per page",
      },
    },
    {
      name: "enabled",
      type: "select",
      hasMany: true,
      defaultValue: ["announcements", "articles", "news-feat"],
      required: true,
      options: [
        { label: "Announcements", value: "announcements" },
        { label: "Articles", value: "articles" },
        { label: "Newspaper Features", value: "news-feat" },
      ],
      admin: {
        description: "Which content types to show as tabs",
      },
    },
  ],
};
