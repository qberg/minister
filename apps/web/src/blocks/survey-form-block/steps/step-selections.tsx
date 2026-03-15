"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useForm } from "@tanstack/react-form";
import { Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { submitSurveyAction } from "@/app/actions/survey-actions";
import { useSurveyFormStore } from "@/lib/stores/use-survey-form-store";
import type { SurveyBlock } from "@/payload-types";

type Option = { id: number | string; label: string };

type Props = {
  block: SurveyBlock;
  mapZones?: Option[];
  visionCategories?: Option[];
};

const getErrorMessage = (error: any): string => {
  if (!error) {
    return "";
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "Invalid value";
};

export function StepSelections({
  block,
  mapZones = [],
  visionCategories = [],
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { personalInfo, selections, setSelections, setStep } =
    useSurveyFormStore();

  const form = useForm({
    defaultValues: {
      mapZoneId: selections?.mapZoneId?.toString() || "",
      visionCategoryId: selections?.visionCategoryId?.toString() || "",
      vision: selections?.vision || "",
    },
    onSubmit: async ({ value }) => {
      if (!(personalInfo?.mobile && personalInfo.name)) {
        toast.error("Missing personal information. Please restart.");
        return;
      }

      setIsLoading(true);

      try {
        const result = await submitSurveyAction({
          name: personalInfo.name,
          mobile: personalInfo.mobile,
          mapZoneId: Number(value.mapZoneId),
          visionCategoryId: Number(value.visionCategoryId),
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setSelections({
          mapZoneId: Number(value.mapZoneId),
          visionCategoryId: Number(value.visionCategoryId),
          vision: value.vision,
        });

        toast.success("Vision submitted successfully!");
        setStep("success"); // Triggers the success view in parent
      } catch (_error) {
        toast.error("Failed to submit. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      const { values } = form.state;
      setSelections({
        mapZoneId: values.mapZoneId ? Number(values.mapZoneId) : 0,
        visionCategoryId: values.visionCategoryId
          ? Number(values.visionCategoryId)
          : 0,
        vision: values.vision,
      });
    });
    return () => unsubscribe();
  }, [form, setSelections]);

  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* 1. Map Zone Dropdown */}
      <form.Field name="mapZoneId">
        {(field) => (
          <div className="flex flex-col gap-2 md:gap-4">
            <label className="pl-1 opacity-80" htmlFor="map-zone">
              <Typography as={"span"} intent={"title"} variant={"headingXXS"}>
                {block.mapZoneLabel || "Select Zone"}
              </Typography>
            </label>

            <Select
              onValueChange={(val) => field.handleChange(val)}
              value={field.state.value}
            >
              <SelectTrigger className={cn("w-full")} id="map-zone">
                <SelectValue
                  placeholder={block.mapZonePlaceholder || "Choose your area"}
                />
              </SelectTrigger>
              <SelectContent>
                {mapZones.length > 0 ? (
                  mapZones.map((zone) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={zone.id}
                      value={String(zone.id)}
                    >
                      {zone.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-neutral-500 text-sm">
                    No zones available
                  </div>
                )}
              </SelectContent>
            </Select>

            <AnimatePresence>
              {field.state.meta.errors.length > 0 && (
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-1 font-medium text-red-400 text-sm"
                  initial={{ opacity: 0, y: -5 }}
                >
                  {getErrorMessage(field.state.meta.errors[0])}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </form.Field>

      {/* 2. Vision Category Dropdown */}
      <form.Field name="visionCategoryId">
        {(field) => (
          <div className="flex flex-col gap-2 md:gap-4">
            <label className="pl-1 opacity-80" htmlFor="vision-cat">
              <Typography as={"span"} intent={"title"} variant={"headingXXS"}>
                {block.visionCategoryLabel || "Priority Area"}
              </Typography>
            </label>

            <Select
              onValueChange={(val) => field.handleChange(val)}
              value={field.state.value}
            >
              <SelectTrigger className={cn("w-full")} id="vision-cat">
                <SelectValue
                  placeholder={
                    block.visionCategoryPlaceholder || "Select priority"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {visionCategories.length > 0 ? (
                  visionCategories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-neutral-500 text-sm">
                    No categories found
                  </div>
                )}
              </SelectContent>
            </Select>

            <AnimatePresence>
              {field.state.meta.errors.length > 0 && (
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-1 font-medium text-red-400 text-sm"
                  initial={{ opacity: 0, y: -5 }}
                >
                  {getErrorMessage(field.state.meta.errors[0])}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </form.Field>

      {/* 3. Vision Text Area */}
      <form.Field name="vision">
        {(field) => (
          <div className="flex flex-col gap-2 md:gap-4">
            <label className="pl-1 opacity-80" htmlFor={field.name}>
              <Typography as={"span"} intent={"title"} variant={"headingXXS"}>
                Your Vision
              </Typography>
            </label>

            <div className="relative">
              <Textarea
                className={cn("min-h-[120px] w-full resize-none")}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe your vision for the constituency..."
                value={field.state.value}
              />
            </div>

            <AnimatePresence>
              {field.state.meta.errors.length > 0 && (
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-1 font-medium text-red-400 text-sm"
                  initial={{ opacity: 0, y: -5 }}
                >
                  {getErrorMessage(field.state.meta.errors[0])}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </form.Field>

      {/* Submit Button */}
      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative mx-auto mt-4 w-full cursor-pointer overflow-hidden rounded-full py-4 font-body font-bold text-lg md:w-[50%]",
              "flex items-center justify-center gap-2",
              "transition-all duration-300 ease-out",
              canSubmit && !isLoading
                ? "bg-accent text-blue-950 shadow-accent/20 shadow-lg hover:bg-accent/90 hover:shadow-accent/40 active:scale-[0.98]"
                : "cursor-not-allowed border border-white/5 bg-neutral-800/50 text-neutral-500"
            )}
            disabled={!canSubmit || isLoading}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            type="submit"
            whileTap={canSubmit && !isLoading ? { scale: 0.98 } : {}}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  animate={{ opacity: 1, rotate: 0 }}
                  className="flex items-center gap-2"
                  exit={{ opacity: 0, rotate: 180 }}
                  initial={{ opacity: 0, rotate: -180 }}
                  key="loading"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{block.loadingSubmit || "Submitting..."}</span>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                  exit={{ opacity: 0, x: 10 }}
                  initial={{ opacity: 0, x: -10 }}
                  key="ready"
                >
                  <span>{block.selectionsCta || "Submit Vision"}</span>
                  <Check className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </form.Subscribe>
    </motion.form>
  );
}
