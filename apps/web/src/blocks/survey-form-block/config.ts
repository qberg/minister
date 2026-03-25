import type { Block } from "payload";

export const SurveyFormBlock: Block = {
  slug: "survey",
  interfaceName: "SurveyBlock",
  labels: {
    singular: "Survey Form",
    plural: "Survey Forms",
  },
  fields: [
    {
      name: "bgImg",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
      admin: {
        description: "Optional background image for the form section",
      },
    },

    // Main Section
    {
      type: "collapsible",
      label: "Main Section",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "My Vision for Our Constituency",
          admin: {
            description: "Main heading for the survey form",
          },
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          defaultValue:
            "Share your vision to help shape the future of our constituency.",
          admin: {
            description: "Subheading description",
          },
        },
      ],
    },

    {
      type: "collapsible",
      label: "Step 1: Personal Info",
      fields: [
        {
          name: "personalInfoTitle",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Provide Your Mobile Number",
        },
        {
          name: "personalInfoDesc",
          type: "textarea",
          localized: true,
          defaultValue:
            "This helps us ensure every vision comes from a real citizen.",
        },
        {
          name: "nameLabel",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Full Name",
        },
        {
          name: "namePlaceholder",
          type: "text",
          localized: true,
          defaultValue: "Enter your full name",
        },
        {
          name: "mobileLabel",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Mobile Number",
        },
        {
          name: "mobilePlaceholder",
          type: "text",
          localized: true,
          defaultValue: "98XXXXXXXX",
        },
        {
          name: "personalInfoCta",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Next Step",
        },
      ],
    },

    {
      type: "collapsible",
      label: "Step 2: OTP Verification",
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: "otpTitle",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Enter Verification Code",
        },
        {
          name: "otpDesc",
          type: "textarea",
          localized: true,
          defaultValue:
            "We've sent a 6-digit code to your mobile number. Please enter it below.",
        },
        {
          name: "otpPlaceholder",
          type: "text",
          localized: true,
          defaultValue: "Enter 6-digit OTP",
        },
        {
          name: "otpCta",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Verify & Continue",
        },
        {
          name: "resendOtpText",
          type: "text",
          localized: true,
          defaultValue: "Didn't receive code?",
        },
        {
          name: "resendOtpCta",
          type: "text",
          localized: true,
          defaultValue: "Resend OTP",
        },
      ],
    },

    // Step 3: Selections
    {
      type: "collapsible",
      label: "Step 2: Selections",
      fields: [
        {
          name: "selectionsTitle",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Share Your Vision",
        },
        {
          name: "selectionsDesc",
          type: "textarea",
          localized: true,
          defaultValue:
            "Tell us which area you live in and what matters most to you.",
        },
        {
          name: "mapZoneLabel",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Your Zone",
        },
        {
          name: "mapZonePlaceholder",
          type: "text",
          localized: true,
          defaultValue: "Select your area",
        },
        {
          name: "visionCategoryLabel",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Priority Area",
        },
        {
          name: "visionCategoryPlaceholder",
          type: "text",
          localized: true,
          defaultValue: "What matters most to you?",
        },
        {
          name: "visionTextLabel",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Your Vision (Optional)",
        },
        {
          name: "visionTextPlaceholder",
          type: "textarea",
          localized: true,
          defaultValue: "Tell us more about what you'd like to see improved...",
        },
        {
          name: "selectionsCta",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Submit Vision",
        },
      ],
    },

    // Step 4: Success
    {
      type: "collapsible",
      label: "Step 3: Success Message",
      fields: [
        {
          name: "successTitle",
          type: "text",
          localized: true,
          required: true,
          defaultValue: "Thank You for Sharing Your Vision!",
        },
        {
          name: "successDesc",
          type: "textarea",
          localized: true,
          defaultValue:
            "Your voice matters. We've received your submission and will work towards making our constituency better together.",
        },
        {
          name: "successCta",
          type: "text",
          localized: true,
          defaultValue: "Submit Another Vision",
        },
        {
          name: "successSecondaryText",
          type: "text",
          localized: true,
          defaultValue: "View all submissions",
        },
      ],
    },

    // Error Messages
    {
      type: "collapsible",
      label: "Error Messages",
      fields: [
        {
          name: "errorNameRequired",
          type: "text",
          localized: true,
          defaultValue: "Please enter your name",
        },
        {
          name: "errorNameTooShort",
          type: "text",
          localized: true,
          defaultValue: "Name must be at least 2 characters",
        },
        {
          name: "errorMobileRequired",
          type: "text",
          localized: true,
          defaultValue: "Please enter your mobile number",
        },
        {
          name: "errorMobileInvalid",
          type: "text",
          localized: true,
          defaultValue: "Please enter a valid 10-digit mobile number",
        },
        {
          name: "errorOtpRequired",
          type: "text",
          localized: true,
          defaultValue: "Please enter the OTP",
        },
        {
          name: "errorOtpInvalid",
          type: "text",
          localized: true,
          defaultValue: "Please enter a valid 6-digit OTP",
        },
        {
          name: "errorZoneRequired",
          type: "text",
          localized: true,
          defaultValue: "Please select your zone",
        },
        {
          name: "errorCategoryRequired",
          type: "text",
          localized: true,
          defaultValue: "Please select a priority area",
        },
      ],
    },

    // Loading States
    {
      type: "collapsible",
      label: "Loading States",
      fields: [
        {
          name: "loadingSendOtp",
          type: "text",
          localized: true,
          defaultValue: "Sending OTP...",
        },
        {
          name: "loadingVerifyOtp",
          type: "text",
          localized: true,
          defaultValue: "Verifying...",
        },
        {
          name: "loadingSubmit",
          type: "text",
          localized: true,
          defaultValue: "Submitting...",
        },
      ],
    },
  ],
};
