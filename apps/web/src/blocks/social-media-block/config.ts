import type { Block } from "payload";

export const SocialMediaBlock: Block = {
  slug: "social-media",
  interfaceName: "SocialMediaBlock",
  labels: {
    singular: "Social Media Section",
    plural: "Social Media Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      localized: true,
      defaultValue: "Follow T.M. Anbarasan",
    },

    {
      name: "socialLinks",
      type: "array",
      label: "Social Media Links",
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: "platform",
          type: "select",
          label: "Platform",
          required: true,
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "Twitter/X", value: "twitter" },
            { label: "Facebook", value: "facebook" },
            { label: "YouTube", value: "youtube" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "GitHub", value: "github" },
          ],
        },
        {
          name: "url",
          type: "text",
          label: "Profile URL",
          required: true,
        },
      ],
    },
  ],
};
