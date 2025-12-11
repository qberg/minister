import type { Field, GroupField } from "payload";
import { deepMerge } from "@/utils";

type LinkType = (options?: {
  disableLabel?: boolean;
  disableAnchor?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const link: LinkType = ({
  disableLabel = false,
  disableAnchor = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            options: [
              {
                label: "Internal Link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
            },
            label: "Open in new tab",
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
        ...(disableLabel ? {} : { width: "50%" }),
      },
      label: "Document to link to",
      relationTo: ["pages"],
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
        ...(disableLabel ? {} : { width: "50%" }),
      },
      label: "Custom URL",
      required: true,
    },
  ];

  if (!disableAnchor) {
    linkTypes.push({
      name: "anchor",
      type: "text",
      admin: {
        description:
          'Optional: Add # to scroll to a section (e.g., "team" for #team)',
        placeholder: "section-id",
        ...(disableLabel ? {} : { width: "50%" }),
      },
      label: "Anchor/Section ID",
    });
  }

  if (!disableLabel) {
    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          localized: true,
          admin: {
            width: "50%",
          },
          label: "Label",
          required: true,
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  return deepMerge(linkResult, overrides);
};
