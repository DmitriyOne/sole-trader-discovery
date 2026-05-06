"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  responseSchema,
  SURVEY_STEPS,
  type TResponseInput,
} from "@/entities/response";
import { scrollToTop } from "@/shared/lib/scrollToTop";
import { useSurveyDraft } from "./SurveyDraftContext";

type TUseMultiStepFormReturn = {
  form: UseFormReturn<TResponseInput>;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goNext: () => Promise<void>;
  goBack: () => void;
  currentStepData: (typeof SURVEY_STEPS)[number];
  resetDraft: () => void;
};

export function useMultiStepForm(): TUseMultiStepFormReturn {
  const { draft, step, saveDraft, saveStep, resetDraft } = useSurveyDraft();

  const [currentStep, setCurrentStep] = useState(step);

  const form = useForm<TResponseInput>({
    resolver: zodResolver(responseSchema),
    mode: "onBlur",
    defaultValues: {
      email: draft.email ?? "",
      business: draft.business ?? "",
      tenure: draft.tenure,
      q1_admin_task: draft.q1_admin_task ?? "",
      q2_currently_paying: draft.q2_currently_paying ?? "",
      q3_magic_wand: draft.q3_magic_wand ?? "",
      consent: draft.consent,
    },
  });

  // Persist current step into context whenever it changes,
  // so navigation away and back resumes on the same step.
  useEffect(() => {
    saveStep(currentStep);
  }, [currentStep, saveStep]);

  // Persist form values on unmount (e.g. user navigates to /cookies),
  // so the draft survives SPA route changes within the same tab.
  useEffect(() => {
    return () => {
      saveDraft(form.getValues());
    };
  }, [form, saveDraft]);

  const totalSteps = SURVEY_STEPS.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepData = SURVEY_STEPS[currentStep];

  const goNext = useCallback(async () => {
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
      saveDraft(form.getValues());
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  }, [currentStep, currentStepData, form, totalSteps, saveDraft]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      saveDraft(form.getValues());
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  }, [currentStep, form, saveDraft]);

  return {
    form,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goNext,
    goBack,
    currentStepData,
    resetDraft,
  };
}
