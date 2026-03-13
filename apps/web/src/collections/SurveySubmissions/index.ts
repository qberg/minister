import type { CollectionConfig } from "payload";
import {
  AdminAccess,
  ContentManagerAccess,
} from "@/access/collection-level-access";

const INDIAN_MOBILE_REGEX = /^[6-9][0-9]{9}$/;

export const SurveySubmissions: CollectionConfig<"survey-sub"> = {
  slug: "survey-sub",
  labels: {
    singular: "Survey Submission",
    plural: "Survey Submissions",
  },
  access: {
    create: () => false,
    read: ContentManagerAccess,
    update: () => false,
    delete: AdminAccess,
  },
  admin: {
    useAsTitle: "name",
    group: "Real Results of Alandur",
    description: "OTP-verified survey submissions from citizens",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    {
      name: "mobile",
      type: "text",
      required: true,
      index: true,
      validate: (value: string | null | undefined) => {
        if (!value) {
          return "Mobile number is required";
        }
        if (!INDIAN_MOBILE_REGEX.test(value)) {
          return "Invalid mobile number format";
        }
        return true;
      },
    },
    {
      name: "mobileVerified",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Automatically set to true after OTP verification",
      },
    },
    {
      name: "mapZone",
      type: "relationship",
      relationTo: "map-zones",
      required: true,
    },
    {
      name: "visionCategory",
      type: "relationship",
      relationTo: "issues",
      required: true,
    },
    {
      name: "vision",
      type: "textarea",
      defaultValue: "My vision",
    },
    {
      name: "submittedAt",
      type: "date",
      index: true,
      required: true,
      admin: {
        readOnly: true,
        description: "Timestamp of form submission",
        position: "sidebar",
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: "ipAddress",
      type: "text",
      admin: {
        description: "IP address for security tracking",
        position: "sidebar",
      },
    },
  ],
};
