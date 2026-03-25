import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  PersonalInfoInput,
  SelectionsInput,
} from "../validations/survey.schema";

export type SurveyStep = "personal-info" | "selections" | "success";

type SurveyFormStore = {
  currentStep: SurveyStep;
  direction: number;
  personalInfo: PersonalInfoInput | null;
  selections: SelectionsInput | null;
  submissionId?: string | number;
  setStep: (step: SurveyStep) => void;
  setPersonalInfo: (data: PersonalInfoInput) => void;
  setSelections: (data: SelectionsInput) => void;
  setSubmissionId: (id: string | number) => void;
  reset: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const stepOrder: SurveyStep[] = ["personal-info", "selections", "success"];

const initialState = {
  currentStep: "personal-info" as SurveyStep,
  direction: 1,
  personalInfo: null,
  selections: null,
  submissionId: undefined,
};

export const useSurveyFormStore = create<SurveyFormStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      setPersonalInfo: (data) => set({ personalInfo: data }),
      setSelections: (data) => set({ selections: data }),
      setSubmissionId: (id) => set({ submissionId: id }),
      reset: () => set(initialState),
      goToNextStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex < stepOrder.length - 1) {
          set({ currentStep: stepOrder[currentIndex + 1], direction: 1 });
        }
      },
      goToPreviousStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex > 0) {
          set({ currentStep: stepOrder[currentIndex - 1], direction: -1 });
        }
      },
    }),
    {
      name: "survey-form-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        personalInfo: state.personalInfo,
        selections: state.selections,
      }),
    }
  )
);
