"use client";

import { useState, useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  responseSchema,
  SURVEY_STEPS,
  type TResponseInput,
} from "@/entities/response";
import { scrollToTop } from "@/shared/lib/scrollToTop";

type TUseMultiStepFormReturn = {
  form: UseFormReturn<TResponseInput>;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goNext: () => Promise<void>;
  goBack: () => void;
  currentStepData: (typeof SURVEY_STEPS)[number];
};

export function useMultiStepForm(): TUseMultiStepFormReturn {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<TResponseInput>({
    resolver: zodResolver(responseSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      business: "",
      tenure: undefined,
      q1_admin_task: "",
      q2_currently_paying: "",
      q3_magic_wand: "",
      consent: undefined,
    },
  });

  const totalSteps = SURVEY_STEPS.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepData = SURVEY_STEPS[currentStep];

  const goNext = useCallback(async () => {
    // Validate only the fields visible on the current step
    const fieldsToValidate = currentStepData.fields;
    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) {
      const firstInvalid = fieldsToValidate.find(
        (name) => form.getFieldState(name).invalid
      );
      if (firstInvalid) {
        form.setFocus(firstInvalid);
      }
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      // Smooth scroll to top of form on step change
      scrollToTop();
    }
  }, [currentStep, currentStepData, form, totalSteps]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  }, [currentStep]);

  return {
    form,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goNext,
    goBack,
    currentStepData,
  };
}
