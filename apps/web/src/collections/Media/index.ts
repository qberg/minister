import type { CollectionConfig } from "payload";

export const Media: CollectionConfig<"media"> = {
  slug: "media",
  access: {
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: "Media",
    defaultColumns: ["fileName", "alt", "url", "updatedAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Alternative text for accessibility and SEO",
        placeholder: "Describe what is shown in this image/video",
      },
    },

    {
      name: "blurDataUrl",
      type: "text",
      label: "Blurred Image URL",
      admin: {
        hidden: true,
        description:
          "Auto generated url of the blurred version of the image, can be used for placeholder loading in Nextjs Image.",
      },
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    crop: true,
    focalPoint: true,

    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
        fit: "cover",
      },

      {
        name: "blur",
        width: 20,
        height: undefined,
        position: "centre",
        fit: "inside",
        formatOptions: {
          format: "webp",
          options: {
            quality: 50,
          },
        },
      },
    ],
    mimeTypes: [
      // Images
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      // Videos
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm",
      "video/mpeg",
      "video/ogg",
    ],
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.file && req.file.name) {
          const sanitizedName = req.file.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9.\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");

          if (sanitizedName) {
            data.filename = sanitizedName;
          }
        }
        return data;
      },
    ],
  },
};
