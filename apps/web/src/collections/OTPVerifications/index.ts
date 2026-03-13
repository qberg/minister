import type { CollectionConfig } from "payload";
import { AdminAccess } from "@/access/collection-level-access";

const INDIAN_PHONE_REGEX = /^[6-9][0-9]{9}$/;

export const OTPVerifications: CollectionConfig = {
  slug: "otp-verifications",
  admin: {
    useAsTitle: "mobile",
    group: "Real Results of Alandur",
    defaultColumns: [
      "mobile",
      "verified",
      "attempts",
      "expiresAt",
      "createdAt",
    ],
    description:
      "OTP verification records with rate limiting and attempt tracking",
  },
  access: {
    create: () => false,
    read: AdminAccess,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "mobile",
      type: "text",
      required: true,
      index: true,
      validate: (value: string | null | undefined) => {
        if (!value) {
          return "Mobile number is required";
        }
        if (!INDIAN_PHONE_REGEX.test(value)) {
          return "Invalid mobile number format";
        }
        return true;
      },
    },
    {
      name: "otpHash",
      type: "text",
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "expiresAt",
      type: "date",
      required: true,
      index: true,
    },
    {
      name: "verified",
      type: "checkbox",
      defaultValue: false,
      index: true,
    },
    {
      name: "attempts",
      type: "number",
      defaultValue: 0,
      required: true,
    },
    {
      name: "maxAttempts",
      type: "number",
      defaultValue: 3,
      required: true,
    },
    {
      name: "blockedUntil",
      type: "date",
      admin: {
        description: "User is blocked from requesting new OTPs until this time",
      },
    },
    {
      name: "ipAddress",
      type: "text",
      admin: {
        description: "IP address for security tracking",
      },
    },
  ],
  timestamps: true,
};
