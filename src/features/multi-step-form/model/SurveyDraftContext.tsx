"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TResponseInput } from "@/entities/response";

type TDraft = Partial<TResponseInput>;

type TSurveyDraftContext = {
  draft: TDraft;
  step: number;
  saveDraft: (draft: TDraft) => void;
  saveStep: (step: number) => void;
  resetDraft: () => void;
};

const SurveyDraftContext = createContext<TSurveyDraftContext | null>(null);

const EMPTY_DRAFT: TDraft = {};

type TSurveyDraftProviderProps = {
  children: ReactNode;
};

export function SurveyDraftProvider({ children }: TSurveyDraftProviderProps) {
  const [draft, setDraft] = useState<TDraft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);

  const resetDraft = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    setStep(0);
  }, []);

  const value = useMemo<TSurveyDraftContext>(
    () => ({
      draft,
      step,
      saveDraft: setDraft,
      saveStep: setStep,
      resetDraft,
    }),
    [draft, step, resetDraft]
  );

  return (
    <SurveyDraftContext.Provider value={value}>
      {children}
    </SurveyDraftContext.Provider>
  );
}

export function useSurveyDraft(): TSurveyDraftContext {
  const ctx = useContext(SurveyDraftContext);
  if (!ctx) {
    throw new Error(
      "useSurveyDraft must be used within <SurveyDraftProvider>"
    );
  }
  return ctx;
}
