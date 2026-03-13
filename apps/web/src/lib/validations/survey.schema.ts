import { z } from "zod";

const INDIAN_MOBILE_REGEX = /^[6-9][0-9]{9}$/;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
    .max(
      NAME_MAX_LENGTH,
      `Name must be less than ${NAME_MAX_LENGTH} characters`
    )
    .trim(),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(
      INDIAN_MOBILE_REGEX,
      "Invalid mobile number. Must be 10 digits starting with 6-9"
    ),
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]{6}$/, "OTP must contain only numbers"),
});

export type OTPInput = z.infer<typeof otpSchema>;

export const selectionsSchema = z.object({
  mapZoneId: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((val) => val > 0, "Please select a valid Map Zone"),
  visionCategoryId: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((val) => val > 0, "Please select a valid Vision Category"),
  vision: z
    .string()
    .max(500, "Vision must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type SelectionsInput = z.infer<typeof selectionsSchema>;

export const completeSurveySchema = z.object({
  ...personalInfoSchema.shape,
  ...otpSchema.shape,
  ...selectionsSchema.shape,
});

export type CompleteSurveyInput = z.infer<typeof completeSurveySchema>;
