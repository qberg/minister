"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import type { TypedLocale } from "payload";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import BackgroundImage from "@/components/background-image";
import { getMediaUrl } from "@/lib/payload-media-utils";
import {
  type SurveyStep,
  useSurveyFormStore,
} from "@/lib/stores/use-survey-form-store";
import type { SurveyBlock } from "@/payload-types";
import { SurveyStepper } from "./stepper";
import { StepOtpVerification } from "./steps/step-otp-verification";
import { StepPersonalInfo } from "./steps/step-personal-info";
import { StepSelections } from "./steps/step-selections";

const iosSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
} as const;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.95,
    position: "absolute" as const,
    width: "100%",
  }),
};

type Option = { id: number | string; label: string };

type Props = {
  locale: TypedLocale;
  block: SurveyBlock;
  mapZones: Option[];
  visionCategories: Option[];
};

export function SurveyFormBlock({ block, mapZones, visionCategories }: Props) {
  const { currentStep } = useSurveyFormStore();

  const [direction, setDirection] = useState(0);

  const [ref, bounds] = useMeasure();

  const bgImageUrl = getMediaUrl(block.bgImg);

  const stepConfig = [
    {
      key: "personal-info" as SurveyStep,
      title: block.personalInfoTitle,
      description: block.personalInfoDesc,
      label: "Verify Identity",
    },
    {
      key: "otp-verification" as SurveyStep,
      title: block.otpTitle,
      description: block.otpDesc,
      label: "Verify Identity",
    },
    {
      key: "selections" as SurveyStep,
      title: block.selectionsTitle,
      description: block.selectionsDesc,
      label: "Verify Identity",
    },
  ];

  const currentStepIndex = stepConfig.findIndex((s) => s.key === currentStep);

  const ActiveStepComponent = useMemo(() => {
    switch (currentStep) {
      case "personal-info":
        return <StepPersonalInfo block={block} />;
      case "otp-verification":
        return <StepOtpVerification block={block} />;
      case "selections":
        return (
          <StepSelections
            block={block}
            mapZones={mapZones}
            visionCategories={visionCategories}
          />
        );
      case "success":
        return <div>Success</div>;
      default:
        return null;
    }
  }, [currentStep, block]);

  return (
    <Box
      as="section"
      className={cn(
        "theme-dark relative bg-primary",
        "min-h-screen",
        "flex flex-col items-center justify-start"
      )}
      overflow="hidden"
    >
      <BackgroundImage src={bgImageUrl} />

      <Box className="relative z-10 mt-[19vw] flex w-full flex-col gap-6 overflow-hidden rounded-[2.5vw] border border-white/10 bg-black shadow-2xl backdrop-blur-xl md:mt-[6.5vw] md:gap-[3vw]">
        <div className="flex w-full flex-col items-center gap-3 border-white/5 border-b text-center md:gap-[1.25vw]">
          <Typography as="h2" intent="title" variant="headingLG">
            {block.title}
          </Typography>

          <Typography as="p" intent="subtle" variant="headingXS">
            {stepConfig[currentStepIndex]?.description || block.description}
          </Typography>
        </div>

        <SurveyStepper
          currentStepIndex={currentStepIndex === -1 ? 3 : currentStepIndex}
          steps={stepConfig}
        />

        <motion.div
          animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
          className="relative w-full overflow-hidden"
          transition={iosSpring}
        >
          <div className="p-0" ref={ref}>
            <MotionConfig transition={iosSpring}>
              <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout"
              >
                <motion.div
                  animate="center"
                  className="mx-auto w-full md:max-w-[45%]"
                  custom={direction}
                  exit="exit"
                  initial="enter"
                  key={currentStep}
                  onAnimationStart={() => {
                    // Optional: Prevent interactions during transition
                  }}
                  variants={variants}
                >
                  {ActiveStepComponent}
                </motion.div>
              </AnimatePresence>
            </MotionConfig>
          </div>
        </motion.div>
      </Box>
    </Box>
  );
}
