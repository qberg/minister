import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  OTPInput,
  PersonalInfoInput,
  SelectionsInput,
} from "../validations/survey.schema";

export type SurveyStep =
  | "personal-info"
  | "otp-verification"
  | "selections"
  | "success";

type SurveyFormStore = {
  currentStep: SurveyStep;

  // form data
  personalInfo: PersonalInfoInput | null;
  otp: OTPInput | null;
  selections: SelectionsInput | null;
  otpVerified: boolean;
  submissionId?: string | number;

  setStep: (step: SurveyStep) => void;
  setPersonalInfo: (data: PersonalInfoInput) => void;
  setOTP: (data: OTPInput) => void;
  setOTPVerified: (verified: boolean) => void;
  setSelections: (data: SelectionsInput) => void;
  setSubmissionId: (id: string | number) => void;
  reset: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const initialState = {
  currentStep: "personal-info" as SurveyStep,
  personalInfo: null,
  otp: null,
  selections: null,
  otpVerified: false,
  submissionId: undefined,
};

const stepOrder: SurveyStep[] = [
  "personal-info",
  "otp-verification",
  "selections",
  "success",
];

export const useSurveyFormStore = create<SurveyFormStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      setPersonalInfo: (data) => set({ personalInfo: data }),

      setOTP: (data) => set({ otp: data }),

      setOTPVerified: (verified) => set({ otpVerified: verified }),

      setSelections: (data) => set({ selections: data }),

      setSubmissionId: (id) => set({ submissionId: id }),

      reset: () => set(initialState),

      goToNextStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex < stepOrder.length - 1) {
          set({ currentStep: stepOrder[currentIndex + 1] });
        }
      },

      goToPreviousStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex > 0) {
          set({ currentStep: stepOrder[currentIndex - 1] });
        }
      },
    }),
    {
      name: "survey-form-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        personalInfo: state.personalInfo,
        otp: state.otp,
        selections: state.selections,
        otpVerified: state.otpVerified,
      }),
    }
  )
);
