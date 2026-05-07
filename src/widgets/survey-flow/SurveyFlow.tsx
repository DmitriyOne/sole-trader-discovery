"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { TextInput } from "@/shared/ui/TextInput";
import { TextArea } from "@/shared/ui/TextArea";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { Checkbox } from "@/shared/ui/Checkbox";
import { SectionLabel } from "@/shared/ui/SectionLabel";
import {
  TENURE_OPTIONS,
  type TResponseInput,
} from "@/entities/response";
import {
  useMultiStepForm,
  StepIndicator,
} from "@/features/multi-step-form";
import { submitSurvey } from "@/features/submit-survey";
import { scrollToTop } from "@/shared/lib/scrollToTop";

type TSubmissionState = "idle" | "submitting" | "success" | "error";

function DictationHint() {
  return (
    <aside
      role="note"
      className="mt-3 flex gap-3 items-start border-l-2 border-gold bg-gold/10 pl-3 pr-3.5 py-2.5"
    >
      <span
        aria-hidden="true"
        className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-gold pt-[3px] shrink-0"
      >
        {TEXT.SurveyPage.dictationHintLabel}
      </span>
      <p className="font-serif text-[13px] italic leading-[1.55] text-ink-soft">
        {TEXT.SurveyPage.dictationHint}
      </p>
    </aside>
  );
}

export function SurveyFlow() {
  const {
    form,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goNext,
    goBack,
    currentStepData,
    resetDraft,
  } = useMultiStepForm();

  const [submissionState, setSubmissionState] =
    useState<TSubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInitialStep = useRef(true);

  useEffect(() => {
    if (isInitialStep.current) {
      isInitialStep.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [currentStep]);

  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = form;

  useEffect(() => {
    if (submissionState === "success" || !isDirty) return;

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [submissionState, isDirty]);

  async function onSubmit(payload: TResponseInput) {
    setSubmissionState("submitting");
    setSubmissionError(null);

    const result = await submitSurvey(payload);

    if (result.ok) {
      setSubmissionState("success");
      resetDraft();
      form.reset();
      scrollToTop();
    } else {
      setSubmissionState("error");
      setSubmissionError(result.error);
    }
  }

  if (submissionState === "success") {
    return <SuccessPanel />;
  }

  return (
    <div className="bg-paper border border-rule p-9 sm:p-10">
      <aside
        role="note"
        className="flex gap-3 items-start bg-ink/[0.04] border border-rule px-4 py-3 mb-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft leading-[1.6]">
          {TEXT.SurveyPage.confidentiality}
        </p>
      </aside>

      <SectionLabel>
        {TEXT.SurveyPage.progress(currentStep + 1, totalSteps)}
      </SectionLabel>

      <StepIndicator current={currentStep} total={totalSteps} />

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {TEXT.SurveyPage.stepAnnouncement(
          currentStep + 1,
          totalSteps,
          currentStepData.title
        )}
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-serif font-medium text-[28px] leading-[1.2] tracking-[-0.01em] mb-8 text-ink focus:outline-none"
      >
        {currentStepData.title}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={submissionState === "submitting"}
      >
        {currentStepData.id === "intro" && (
          <>
            <Field
              number={TEXT.SurveyPage.questions.email.number}
              label={TEXT.SurveyPage.questions.email.label}
              required
              help={TEXT.SurveyPage.questions.email.help}
              error={errors.email?.message}
            >
              <TextInput
                type="email"
                placeholder={TEXT.SurveyPage.questions.email.placeholder}
                autoComplete="email"
                {...register("email")}
              />
            </Field>

            <Field
              number={TEXT.SurveyPage.questions.business.number}
              label={TEXT.SurveyPage.questions.business.label}
              required
              help={TEXT.SurveyPage.questions.business.help}
              error={errors.business?.message}
            >
              <TextInput
                type="text"
                placeholder={TEXT.SurveyPage.questions.business.placeholder}
                autoComplete="organization"
                {...register("business")}
              />
            </Field>

            <Field
              number={TEXT.SurveyPage.questions.tenure.number}
              label={TEXT.SurveyPage.questions.tenure.label}
              required
              error={errors.tenure?.message}
              asFieldset
            >
              <Controller
                control={control}
                name="tenure"
                render={({ field }) => (
                  <RadioGroup
                    name="tenure"
                    options={TENURE_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>
          </>
        )}

        {currentStepData.id === "q1" && (
          <Field
            label={TEXT.SurveyPage.questions.q1_admin_task.label}
            required
            help={TEXT.SurveyPage.questions.q1_admin_task.help}
            error={errors.q1_admin_task?.message}
          >
            <TextArea {...register("q1_admin_task")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q2" && (
          <Field
            label={TEXT.SurveyPage.questions.q2_currently_paying.label}
            required
            help={TEXT.SurveyPage.questions.q2_currently_paying.help}
            error={errors.q2_currently_paying?.message}
          >
            <TextArea {...register("q2_currently_paying")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q3" && (
          <>
            <Field
              label={TEXT.SurveyPage.questions.q3_magic_wand.label}
              required
              help={TEXT.SurveyPage.questions.q3_magic_wand.help}
              error={errors.q3_magic_wand?.message}
            >
              <TextArea {...register("q3_magic_wand")} />
              <DictationHint />
            </Field>

            <Field
              label={TEXT.SurveyPage.questions.consent.label}
              required
              error={errors.consent?.message}
              asFieldset
            >
              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value === true}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
                    {TEXT.SurveyPage.consentLabel}
                    <Link
                      href={PATHS.PRIVACY}
                      target="_blank"
                      rel="noopener"
                      className="block mt-2 text-rust-deep underline underline-offset-2 hover:text-rust"
                    >
                      {TEXT.SurveyPage.privacyLinkText}
                    </Link>
                  </Checkbox>
                )}
              />
            </Field>
          </>
        )}

        {/* Submission error */}
        {submissionState === "error" && submissionError && (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-6 px-4 py-3.5 border-l-4 border-rust-deep bg-rust/15 font-mono text-[12px] uppercase tracking-[0.12em] text-rust-deep font-semibold"
          >
            <span aria-hidden="true">✗ </span>
            {TEXT.SurveyPage.error.before}
            <a
              href={`mailto:${TEXT.Footer.contact}`}
              className="underline underline-offset-2 hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {TEXT.Footer.contact}
            </a>
            {TEXT.SurveyPage.error.after}
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-rule">
          {!isFirstStep && (
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={submissionState === "submitting"}
              aria-label={TEXT.SurveyPage.nav.backAria}
            >
              {TEXT.SurveyPage.nav.back}
            </Button>
          )}

          {!isLastStep && (
            <Button
              type="button"
              variant="primary"
              onClick={goNext}
              className="sm:ml-auto"
              aria-label={TEXT.SurveyPage.nav.nextAria}
            >
              {TEXT.SurveyPage.nav.next}
            </Button>
          )}

          {isLastStep && (
            <Button
              type="submit"
              variant="primary"
              disabled={submissionState === "submitting"}
              className="sm:ml-auto"
              aria-label={
                submissionState === "submitting"
                  ? TEXT.SurveyPage.nav.submittingAria
                  : TEXT.SurveyPage.nav.submitAria
              }
            >
              {submissionState === "submitting"
                ? TEXT.SurveyPage.nav.submitting
                : TEXT.SurveyPage.nav.submit}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function SuccessPanel() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-paper border border-rule p-9 sm:p-12"
    >
      {/* Masthead-style strip */}
      <div className="flex items-center gap-3 pb-5 mb-8 border-b border-rule font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft font-medium">
        <span
          aria-hidden="true"
          className="inline-block w-2 h-2 bg-rust rounded-full pulse-dot shrink-0"
        />
        <span>{TEXT.SurveyPage.success.kicker}</span>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-serif font-medium text-[clamp(28px,5vw,40px)] leading-[1.15] tracking-[-0.01em] mb-6 text-ink focus:outline-none"
      >
        {TEXT.SurveyPage.success.title}
      </h2>

      <p className="font-serif text-[18px] leading-[1.6] text-ink-soft mb-4">
        {TEXT.SurveyPage.success.body1}
      </p>
      <p className="font-serif text-[18px] leading-[1.6] text-ink mb-2">
        {TEXT.SurveyPage.success.body2}
      </p>

      {/* Bullets in border-l callout (echoes the hero note pattern) */}
      <div className="bg-bg border-l-[3px] border-rust px-6 py-5 my-7">
        <ul className="space-y-3 font-serif text-[16px] leading-[1.5] text-ink-soft">
          {TEXT.SurveyPage.success.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span
                aria-hidden="true"
                className="text-rust font-mono text-[12px] mt-1.5 shrink-0"
              >
                ▸
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-serif text-[17px] leading-[1.55] text-ink mb-7">
        {TEXT.SurveyPage.success.closing}
      </p>

      {/* Letter-style signoff (mirrors hero note signature) */}
      <div>
        <span className="block font-handwritten text-[28px] sm:text-[30px] text-rust-deep leading-tight">
          {TEXT.SurveyPage.success.signature}
        </span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mt-1.5 font-medium">
          {TEXT.SurveyPage.success.signatureMeta}
        </span>
      </div>

      {/* Postscript — follow-up + referral */}
      <div className="border-t border-rule mt-10 pt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust mb-5 font-medium">
          <span aria-hidden="true" className="text-ink-soft">
            §{" "}
          </span>
          {TEXT.SurveyPage.success.postscriptLabel}
        </div>

        <div className="space-y-4">
          <p className="font-serif text-[15px] leading-[1.6] text-ink-soft">
            {TEXT.SurveyPage.success.followUpPrompt}{" "}
            <a
              href={`mailto:${TEXT.Footer.contact}`}
              className="text-rust-deep underline underline-offset-2 hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {TEXT.Footer.contact}
            </a>
          </p>
          <p className="font-serif text-[15px] leading-[1.6] text-ink-soft">
            {TEXT.SurveyPage.success.referralPrompt}{" "}
            <a
              href={`mailto:${TEXT.Footer.contact}?subject=${encodeURIComponent(TEXT.SurveyPage.success.referralMailSubject)}`}
              className="text-rust-deep underline underline-offset-2 hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {TEXT.Footer.contact}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
