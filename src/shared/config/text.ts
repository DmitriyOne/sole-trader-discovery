export const TEXT = {
  GlobalMeta: {
    title: "What actually slows down UK sole traders",
    description:
      "A short research project trying to find out which parts of running a UK sole trader business eat the most time and energy. Free 6-month access to whatever gets built.",
  },

  Footer: {
    issue: "Discovery № 001 · UK · 2026",
    contact: "[PLACEHOLDER: contact email]",
  },

  HomePage: {
    strip: {
      status: "Discovery phase / open",
      issue: "№ 001 · 2026",
    },

    hero: {
      kicker: "A research project · not a product · yet",
      headlinePart1: "If you run a UK",
      headlinePart2: "sole trader business —",
      headlineEmphasis: "I want 15 minutes",
      headlinePart3: "of your truth.",
      lede: {
        regular1:
          "I’m a fullstack developer in the UK, running my own sole trader practice on the side. I keep noticing that the boring parts of running a one-person business — admin, taxes, chasing invoices, talking to HMRC — quietly eat far more hours than they should. So I’m trying to figure out what’s ",
        strong: "actually painful",
        regular2:
          " for other sole traders, and where AI could realistically help instead of just adding another dashboard nobody opens.",
      },
      note: {
        body: "I don’t have a product to sell you. I have a hypothesis: that there’s at least one specific repetitive task in the life of a UK sole trader that everyone hates and nobody’s properly solved. I refuse to write a single line of product code until I’ve heard from real people doing real work. That’s where you come in.",
        signature: "— Dmitry Fenko",
        meta: "Fellow sole trader · UK",
      },
      skipLink: "Skip the story — open the survey →",
    },

    deal: {
      label: "The trade",
      headline: "What you give. What you get.",
      intro:
        "This isn’t a marketing funnel. There’s no upsell. The exchange is direct and the terms are below.",
      youGive: {
        label: "You give",
        part1: "3 honest questions in a survey.",
        part2: "About",
        emphasis: "15 minutes",
        part3: "of your time. Nothing more.",
      },
      youGet: {
        label: "You get",
        part1: "Free access to whatever I build —",
        part2: "for",
        emphasis: "1-3 full months",
        part3: "after launch. No payment ever requested.",
      },
      closing:
        "If I build nothing, you’ve lost 15 minutes. If I build something good, you’ve helped shape it and you use it free for 1–3 months. That’s the entire deal.",
      cta: "Open the survey →",
    },
  },

  SurveyPage: {
    confidentiality: "Your answers are strictly confidential. They go directly into a private database — no third parties, no marketing lists, no sharing. Only I read them.",
    intro: {
      kicker: "Discovery survey · 3 questions",
      title: "Tell me what actually slows you down.",
      lede: "Each question is open-ended — please type real answers, not ‘all good’ or ‘depends’. The whole point is the specifics. About 15 minutes.",
      cta: "Begin →",
    },
    progress: (current: number, total: number) =>
      `Question ${current} of ${total}`,
    consentLabel:
      "I’ve read the privacy notice and I agree to my answers being stored and used to contact me if a product is built. I can withdraw consent and request deletion at any time.",
    privacyLinkText: "Read the privacy notice",
    dictationHintLabel: "Tip",
    dictationHint:
      "Prefer talking to typing? Tap the mic on your keyboard and dictate it. Messy transcription is fine — I read every word anyway.",
    nav: {
      back: "← Back",
      next: "Next →",
      submit: "Submit",
      submitting: "Submitting…",
    },
    success: {
      title: "That’s it. Thank you — genuinely.",
      body1:
        "Your answers are saved privately. I’ll read every single one personally.",
      body2: "Here’s what happens next:",
      bullets: [
        "I’ll keep collecting responses for ~2 weeks.",
        "If I find a real pattern, I’ll build something narrow and specific around it.",
        "When it’s ready, you get 1–3 months free — no card, no asking.",
        "If I find no pattern, I’ll email you and tell you why I’m not building it.",
      ],
      closing: "Either way, you’ll hear from me. Honest deal.",
      signature: "— Dmitry",
      followUpPrompt:
        "Want to add something the form didn’t cover? Reply to your confirmation email or write to me at",
      referralPrompt:
        "Know another UK sole trader I should hear from? Send me their name or handle at",
      referralMailSubject:
        "Another sole trader you should talk to",
    },
    error: {
      before: "Something went wrong. Please try again — or email ",
      after: " directly.",
    },
  },

  PrivacyPage: {
    meta: {
      title: "Privacy notice — Sole Trader Discovery",
      description:
        "How I collect, store and use the answers you share through the discovery survey.",
    },
    backLink: "← Back to home",
    label: "Privacy notice",
    headline: "What happens to your answers.",
    lastUpdated: "Last updated: April 2026",
    sections: [
      {
        heading: "Who runs this",
        body: "This research project is operated by Dmitry Fenko, a UK sole trader. I’m the data controller for everything described below. If you need to reach me about your data — for any reason — write to [PLACEHOLDER: contact email] and I’ll reply personally.",
      },
      {
        heading: "What I collect",
        body: "Only what you type into the survey: your email, a short description of your business, how long you’ve been running it, and your free-text answers to 3 questions. I don’t use analytics, cookies, fingerprinting, or session recording. There’s no tracking script on this site. Providing this information is entirely voluntary — there’s no contract or legal obligation to participate. If you’d rather not, just don’t submit the survey.",
      },
      {
        heading: "Why I collect it",
        body: "To understand whether there’s a useful product to build for UK sole traders, and to contact you if I do build one. That’s the entire purpose. Your email won’t be sold, shared, or used for marketing of unrelated products.",
      },
      {
        heading: "Where it’s stored",
        body: "Your responses are stored in a Supabase Postgres database hosted in the EU (Frankfurt). Supabase Inc. — the company behind it — is incorporated in the United States, so the transfer to them is covered by the UK International Data Transfer Agreement (IDTA) and standard contractual clauses, which provide appropriate safeguards under UK GDPR. The website itself is served by Vercel, which processes request data (including form submissions in transit) as a data processor under similar safeguards. I’m the only person with access to the stored data.",
      },
      {
        heading: "How long I keep it",
        body: "I keep your responses for as long as the project is active, plus up to 12 months after, in case I need to come back to the data. After that, or whenever you ask, I delete your record permanently.",
      },
      {
        heading: "Your rights (UK GDPR)",
        body: "Under UK GDPR you have the right to: access a copy of your data; correct anything inaccurate; have your data deleted; restrict how I use it; receive your data in a portable format (e.g. a CSV); object to processing; and withdraw your consent at any time. To exercise any of these, email [PLACEHOLDER: contact email]. I’ll respond within one month — usually much faster.",
      },
      {
        heading: "Lawful basis",
        body: "Consent. By ticking the box on the final step of the survey, you agree to this notice. You can withdraw consent at any time by emailing me — that triggers deletion.",
      },
      {
        heading: "What I don’t do",
        body: "I don’t sell data. I don’t share it with third parties beyond Supabase (the database host) and Vercel (the website host). I don’t use it to train AI models. I don’t run ads. I don’t have a marketing funnel. There’s also no automated decision-making or profiling — no algorithm makes any decision about you based on your answers.",
      },
      {
        heading: "Complaints",
        body: "If you think I’ve handled your data unlawfully, you have the right to lodge a complaint with the UK’s data protection regulator — the Information Commissioner’s Office (ICO). You can reach them at ico.org.uk or 0303 123 1113. I’d appreciate the chance to fix things first if you email me, but you’re not obliged to.",
      },
    ],
  },

  TermsPage: {
    meta: {
      title: "Terms of use — Sole Trader Discovery",
      description:
        "The terms that govern your use of this research website, run by Dmitry Fenko, UK sole trader.",
    },
    backLink: "← Back to home",
    label: "Terms of use",
    headline: "How this site works and what you're agreeing to.",
    lastUpdated: "Last updated: April 2026",
    sections: [
      {
        heading: "Who runs this site",
        body: "This website is operated by Dmitry Fenko, a UK sole trader. It is not a company. It is not a startup. It is one person running a research project to understand what's genuinely painful about running a UK sole trader business. You can reach me at [PLACEHOLDER: contact email].",
      },
      {
        heading: "What this site is",
        body: "This is a research and discovery project, not a commercial product or paid service. There is no subscription, no paywall, no purchase involved. By using the site and completing the survey, you are participating in voluntary research.",
      },
      {
        heading: "The free access offer",
        body: "If you complete the survey, I intend in good faith to give you free access to whatever product I build — for 1–3 months after it launches. This is a genuine intention, not a binding contractual promise. It is contingent on a product actually being built. If the research finds no clear problem worth solving, I may not build anything, and no obligation to provide access will arise. If something is built, I will honour the offer. I won't charge you without asking first.",
      },
      {
        heading: "Acceptable use",
        body: "You may use this site only for its intended purpose: reading about the project and completing the survey honestly. You must not submit another person's personal data without their knowledge or consent. You must not attempt to interfere with, scrape, overload, or reverse-engineer any part of the site. You must not submit false, harmful, or offensive content through the survey form.",
      },
      {
        heading: "No warranties",
        body: "This site is provided as-is. I do not warrant that it will be uninterrupted, error-free, or fit for any particular purpose beyond what is described here. I am not a law firm, accountant, or regulated adviser. Nothing on this site constitutes legal, tax, or financial advice.",
      },
      {
        heading: "Limitation of liability",
        body: "To the extent permitted by law, my liability for any loss or damage arising from your use of this site is excluded. This exclusion does not apply to liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under UK law. Because this project is free and non-commercial, any recoverable loss is in any event likely to be nil.",
      },
      {
        heading: "Governing law",
        body: "These terms are governed by the law of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.",
      },
      {
        heading: "Changes to these terms",
        body: "I may update these terms if the project changes materially. If I do, I will update the date at the top of this page. Continued use of the site after a change constitutes acceptance. If you disagree with a change, you are free to stop using the site.",
      },
      {
        heading: "Contact",
        body: "Questions about these terms? Email [PLACEHOLDER: contact email]. I'll reply personally.",
      },
    ],
  },

  CookiesPage: {
    meta: {
      title: "Cookie notice — Sole Trader Discovery",
      description:
        "This site uses no cookies, no tracking, and no analytics. Here's what that means.",
    },
    backLink: "← Back to home",
    label: "Cookie notice",
    headline: "No cookies. No tracking. Nothing.",
    lastUpdated: "Last updated: April 2026",
    sections: [
      {
        heading: "The short version",
        body: "This website does not use cookies. It does not track you. It does not run analytics. It does not fingerprint your browser or device. There is no third-party script of any kind loaded on these pages.",
      },
      {
        heading: "What cookies are",
        body: "Cookies are small text files that a website stores in your browser to remember information about you — your preferences, session state, or behaviour across pages and visits. Many sites use them for analytics, advertising, login sessions, and A/B testing. This site does none of those things.",
      },
      {
        heading: "What this site actually does",
        body: "When you submit the survey, your answers are sent directly to a database (Supabase, hosted in the EU). That request does not involve cookies. Your browser does not store anything locally from this site. There is no session token, no persistent identifier, and no tracking pixel.",
      },
      {
        heading: "If that ever changes",
        body: "If I ever add anything that sets a cookie or loads a tracking script — for example, a login feature or basic analytics — I will update this notice first, implement a proper consent mechanism, and tell you clearly what is being used and why. Until then, this page stays exactly as it is.",
      },
      {
        heading: "Contact",
        body: "If you have questions about this or notice something that looks like tracking behaviour, please email [PLACEHOLDER: contact email].",
      },
    ],
  },

  DisclaimerPage: {
    meta: {
      title: "Disclaimer — Sole Trader Discovery",
      description:
        "This site is a research project, not professional advice. It does not provide legal, tax, or financial guidance.",
    },
    backLink: "← Back to home",
    label: "Disclaimer",
    headline: "Research, not advice.",
    lastUpdated: "Last updated: April 2026",
    sections: [
      {
        heading: "This is not professional advice",
        body: "Nothing on this website constitutes legal, tax, accounting, or financial advice. The site is a research project aimed at understanding the lived experience of UK sole traders. Any information or opinion expressed here is the personal view of one developer — not a qualified solicitor, accountant, or regulated financial adviser.",
      },
      {
        heading: "Tax and HMRC matters",
        body: "If you have questions about Self Assessment, VAT, National Insurance, allowable expenses, or any other tax matter as a sole trader, please consult HMRC directly at gov.uk/hmrc or speak to a qualified accountant. HMRC's guidance is free and authoritative. This site is not a substitute for it.",
      },
      {
        heading: "Legal matters",
        body: "If you need legal advice — on contracts, intellectual property, employment, or anything else — please consult a qualified solicitor. The Law Society's 'Find a Solicitor' tool at solicitors.lawsociety.org.uk is a good starting point.",
      },
      {
        heading: "No liability for decisions",
        body: "I accept no responsibility for any action you take or do not take based on anything you read on this site. The research findings, when published, will reflect patterns in survey responses — they are not recommendations. Always take independent professional advice before making business decisions.",
      },
      {
        heading: "Contact",
        body: "If something on this site has caused genuine concern, email [PLACEHOLDER: contact email] and I will look at it.",
      },
    ],
  },

  NotFoundPage: {
    meta: {
      title: "Page not found — Sole Trader Discovery",
      description:
        "This page doesn’t exist. Maybe you mistyped the URL, or maybe I deleted it. Either way, sorry for the dead end.",
    },
    label: "404 · Not found",
    headline: "This page doesn’t exist.",
    body: "Maybe you mistyped the URL. Maybe I deleted the page. Either way, sorry for the dead end.",
    ctaPrimary: "Back to home",
    ctaSecondary: "Open the survey",
  },

  ErrorPage: {
    label: "500 · Something broke",
    headline: "Something broke on my end.",
    body: "Sorry. The page hit an unexpected error. Try again — and if it keeps happening, write to me directly so I can look at it.",
    ctaPrimary: "Try again",
    ctaSecondary: "Back to home",
    contactPrompt: "Or email ",
    digestLabel: "Reference:",
  },
} as const;

export const PRIVACY_NOTICE_VERSION = "2026-04";

export const PRIVACY_ICO_REGISTRATION_OPTIONAL = {
  heading: "ICO registration",
  body: "I’m registered with the UK Information Commissioner’s Office as a data controller and pay the annual data protection fee. My ICO registration number is [PLACEHOLDER: ICO registration number]. You can verify it on the public register at ico.org.uk/ESDWebPages/Search.",
} as const;
