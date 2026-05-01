"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
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
    <p className="font-serif text-[12px] italic text-ink-soft/70 leading-[1.5] mt-2">
      {TEXT.SurveyPage.dictationHint}
    </p>
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
  } = useMultiStepForm();

  const [submissionState, setSubmissionState] =
    useState<TSubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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
      <SectionLabel>
        {TEXT.SurveyPage.progress(currentStep + 1, totalSteps)}
      </SectionLabel>

      <StepIndicator current={currentStep} total={totalSteps} />

      <h2 className="font-serif font-medium text-[28px] leading-[1.2] tracking-[-0.01em] mb-8 text-ink">
        {currentStepData.title}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {currentStepData.id === "intro" && (
          <>
            <Field
              number="01"
              label="Email"
              required
              help="Used once: to send you the bot link and notify you at launch."
              error={errors.email?.message}
            >
              <TextInput
                type="email"
                placeholder="you@example.co.uk"
                autoComplete="email"
                {...register("email")}
              />
            </Field>

            <Field
              number="02"
              label="What does your sole trader business do?"
              required
              help={"One line is enough. “Freelance designer.” “Photography studio.” “Online tutor.”"}
              error={errors.business?.message}
            >
              <TextInput
                type="text"
                placeholder="e.g. Freelance designer"
                autoComplete="organization"
                {...register("business")}
              />
            </Field>

            <Field
              number="03"
              label="How long have you been running it?"
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
            label="Walk me through your typical work week. What do you actually spend hours doing?"
            required
            help="Not what you’d like to be doing — what eats your real hours."
            error={errors.q1_typical_week?.message}
          >
            <TextArea {...register("q1_typical_week")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q2" && (
          <Field
            label="Tell me about the last work day when you were genuinely stressed or frustrated. What happened?"
            required
            help="Be specific — what triggered it, how did it end? If you have to think hard, that’s fine. Just one real example."
            error={errors.q2_last_stress_day?.message}
          >
            <TextArea {...register("q2_last_stress_day")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q3" && (
          <Field
            label="Last time you had to deal with UK bureaucracy — what was it about?"
            required
            help="HMRC, Companies House, your bank, your accountant, NI, VAT, anything official. What was hard about it (if anything)? How long did it take?"
            error={errors.q3_uk_bureaucracy?.message}
          >
            <TextArea {...register("q3_uk_bureaucracy")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q4" && (
          <Field
            label="Of all the recurring tasks that aren’t the actual work you get paid for — which one annoys you the most?"
            required
            help="Admin, taxes, invoicing, chasing payments, etc. And roughly how many hours per month does it eat?"
            error={errors.q4_what_costs_most?.message}
          >
            <TextArea {...register("q4_what_costs_most")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q5" && (
          <Field
            label="What tools, services or people are you currently paying for to keep your business running?"
            required
            help="Accountant, Xero, Wise, a virtual assistant, ChatGPT Plus, etc. Roughly what does it cost you per month total?"
            error={errors.q5_currently_paying?.message}
          >
            <TextArea {...register("q5_currently_paying")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q6" && (
          <Field
            label="If you could make one problem in your business life disappear tomorrow, what would it be?"
            required
            help="This is the one that matters most. Don’t filter for ‘realistic’. Just whatever genuinely makes you sigh."
            error={errors.q6_magic_wand?.message}
          >
            <TextArea {...register("q6_magic_wand")} />
            <DictationHint />
          </Field>
        )}

        {currentStepData.id === "q7" && (
          <>
            <Field
              label="Who else do you know who’s a UK sole trader / freelancer / small business owner?"
              help="Could you name 1–3 people I might also reach out to? Username, name, or just ‘a friend who runs X’. Totally optional."
              error={errors.q7_referrals?.message}
            >
              <TextArea {...register("q7_referrals")} rows={4} />
              <DictationHint />
            </Field>

            <Field
              label="Privacy & consent"
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
                      href="/privacy"
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
      className="bg-paper border border-rule p-10 sm:p-14 text-center"
    >
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-serif font-medium text-[28px] sm:text-[32px] leading-[1.2] mb-6 text-rust-deep focus:outline-none"
      >
        {TEXT.SurveyPage.success.title}
      </h2>
      <p className="font-serif text-[17px] leading-[1.6] text-ink-soft mb-4">
        {TEXT.SurveyPage.success.body1}
      </p>
      <p className="font-serif text-[17px] leading-[1.6] text-ink mb-4">
        {TEXT.SurveyPage.success.body2}
      </p>
      <ul className="text-left max-w-md mx-auto space-y-2 mb-8 font-serif text-[16px] text-ink-soft">
        {TEXT.SurveyPage.success.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="text-rust font-mono text-[12px] mt-1.5">▸</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <p className="font-serif text-[17px] text-ink mb-2">
        {TEXT.SurveyPage.success.closing}
      </p>
      <p className="font-handwritten text-[24px] text-rust-deep mb-8">
        {TEXT.SurveyPage.success.signature}
      </p>

      {/* Email fallback — for follow-ups beyond what the form captured */}
      <div className="border-t border-rule pt-6 mt-6 max-w-md mx-auto">
        <p className="font-serif text-[15px] text-ink-soft leading-[1.55]">
          {TEXT.SurveyPage.success.followUpPrompt}{" "}
          <a
            href={`mailto:${TEXT.Footer.contact}`}
            className="text-rust-deep underline underline-offset-2 hover:text-rust"
          >
            {TEXT.Footer.contact}
          </a>
        </p>
      </div>
    </div>
  );
}
