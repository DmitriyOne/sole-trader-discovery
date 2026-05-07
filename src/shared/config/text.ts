export const TEXT = {
  GlobalMeta: {
    title: "What actually slows down UK sole traders",
    description:
      "A short research project trying to find out which parts of running a UK sole trader business eat the most time and energy. Free 3 months of access to whatever gets built.",
  },

  Footer: {
    issue: "Discovery № 001 · UK · 2026",
    contact: "hello@fenko.dev",
    legal:
      "Fenko Team is a trading name of Dmytro Fenko, a UK sole trader · Weston-S-Mare, UK",
  },

  HomePage: {
    meta: {
      title: "Sole Trader Discovery — what actually slows down UK sole traders",
      description:
        "A 15-minute research survey for UK sole traders. Tell me what slows you down, get free 3 months of whatever I build. No marketing, no upsell, no tracking.",
    },

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
        body: "I don’t have a product to sell you. I have a hypothesis: that there’s at least one specific repetitive task in the life of a UK sole trader that everyone hates and nobody’s properly solved. I refuse to write a single line of product code until I’ve heard from people actually doing the work. That’s where you come in.",
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
        emphasis: "3 full months",
        part3: "after launch. No payment ever requested.",
      },
      closing:
        "If I build nothing, you’ve lost 15 minutes. If I build something good, you’ve helped shape it and you use it free for 3 months. That’s the entire deal.",
      cta: "Open the survey →",
    },
  },

  SurveyPage: {
    meta: {
      title: "Take the survey — Sole Trader Discovery",
      description:
        "Three honest questions about admin, tools and pain points in your UK sole trader business. About 15 minutes, fully confidential, no tracking.",
    },

    confidentiality: "Your answers are strictly confidential. They go directly into a private database — no third parties, no marketing lists, no sharing. Only I read them.",

    // Per-field copy for the multi-step survey. Question keys mirror the
    // schema field names in entities/response/model/schema.ts (email,
    // business, tenure, q1_admin_task, q2_currently_paying, q3_magic_wand,
    // consent) so it's easy to find which prompt belongs to which field.
    questions: {
      email: {
        number: "01",
        label: "Email",
        help: "Used once: to email you if a product is built.",
        placeholder: "you@example.co.uk",
      },
      business: {
        number: "02",
        label: "What does your sole trader business do?",
        help: "One line is enough. “Freelance designer.” “Photography studio.” “Online tutor.”",
        placeholder: "e.g. Freelance designer",
      },
      tenure: {
        number: "03",
        label: "How long have you been running it?",
      },
      q1_admin_task: {
        label: "What’s a recent admin task that took longer than it should have?",
        help: "Tax, invoicing, the bank, your accountant, scheduling — anything boring but unavoidable. What was it, and roughly how long did it actually take?",
      },
      q2_currently_paying: {
        label: "What tools, services or people are you currently paying for to keep your business running?",
        help: "Accountant, Xero, Wise, a virtual assistant, ChatGPT Plus, etc. Roughly what does it cost you per month total?",
      },
      q3_magic_wand: {
        label: "If you could make one problem in your business life disappear tomorrow, what would it be?",
        help: "This is the one that matters most. Don’t filter for ‘realistic’. Just whatever genuinely makes you sigh.",
      },
      consent: {
        label: "Privacy & consent",
      },
    },

    intro: {
      kicker: "Discovery survey · 3 questions",
      title: "Tell me what actually slows you down.",
      lede: "Each question is open-ended — please type real answers, not ‘all good’ or ‘depends’. The whole point is the specifics. About 15 minutes.",
      cta: "Begin →",
    },
    progress: (current: number, total: number) =>
      `Question ${current} of ${total}`,
    stepAnnouncement: (current: number, total: number, title: string) =>
      `Step ${current} of ${total}: ${title}`,
    consentLabel:
      "I’m 18 or over. I’ve read the privacy notice and I agree to my answers being stored and used to contact me if a product is built. I can withdraw consent and request deletion at any time.",
    privacyLinkText: "Read the privacy notice",
    dictationHintLabel: "Tip",
    dictationHint:
      "Prefer talking to typing? Tap the mic on your keyboard and dictate it. Messy transcription is fine — I read every word anyway.",
    nav: {
      back: "← Back",
      next: "Next →",
      submit: "Submit",
      submitting: "Submitting…",
      backAria: "Go to previous question",
      nextAria: "Go to next question",
      submitAria: "Submit survey",
      submittingAria: "Submitting survey, please wait",
    },
    success: {
      kicker: "Response received · Discovery № 001",
      title: "That’s it. Thank you — genuinely.",
      body1:
        "Your answers are saved privately. I’ll read every single one personally.",
      body2: "Here’s what happens next:",
      bullets: [
        "I’ll keep collecting responses for about 2 weeks.",
        "If I find a real pattern, I’ll build something narrow and specific around it.",
        "When it’s ready, you get 3 months free — no payment card requested, no questions asked.",
        "If I find no pattern, I’ll email you and tell you why I’m not building it.",
      ],
      closing: "Either way, you’ll hear from me. Honest deal.",
      signature: "— Dmitry Fenko",
      signatureMeta: "Fellow sole trader · UK",
      postscriptLabel: "Postscript",
      followUpPrompt:
        "Want to add something the form didn’t cover? Email me at",
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
    lastUpdated: "Last updated: 7 May 2026",
    sections: [
      {
        heading: "Who runs this",
        body: "This research project is operated by Dmytro Fenko (publishing as Dmitry Fenko), a UK sole trader trading as Fenko Team. I’m the data controller for everything described below. The project doesn’t meet the conditions in UK GDPR Article 37 that require a Data Protection Officer, so I haven’t appointed one — I handle every data protection matter personally. If you need to reach me about your data, write to support@fenko.dev and I’ll reply personally.",
      },
      {
        heading: "ICO registration",
        body: "I’m registered with the UK Information Commissioner’s Office as a data controller and pay the annual data protection fee. My ICO registration number is [PLACEHOLDER: ICO public registration number]. You can verify it on the public register at ico.org.uk/ESDWebPages/Search.",
      },
      {
        heading: "What I collect",
        body: "Only what you type into the survey: your email address, a short description of your business, how long you’ve been running it, your free-text answers to three open-ended questions, and a server-stamped timestamp recording when you ticked the consent box and which version of this notice was in force at that moment. All of it is collected directly from you when you submit the form; nothing is bought, scraped, or inferred from other sources. I don’t use analytics, cookies, fingerprinting, or session recording, and there’s no tracking script on this site. Providing this information is entirely voluntary — there’s no contract or legal obligation to participate. If you’d rather not, just don’t submit the survey.",
      },
      {
        heading: "Why I collect it",
        body: "To understand whether there’s a useful product to build for UK sole traders, and to contact you if I do build one. That’s the entire purpose. Your email won’t be sold, shared, or used for marketing of unrelated products.",
      },
      {
        heading: "Where it’s stored",
        body: "Your responses are stored in a Supabase Postgres database hosted in the EU (Frankfurt), encrypted at rest by the platform and transmitted over TLS. Supabase Inc. — the company behind the platform — is incorporated in the United States, so the transfer to them is covered by the standard contractual clauses and the UK International Data Transfer Agreement (IDTA) included in Supabase’s published Data Processing Agreement (supabase.com/legal/dpa), which provide appropriate safeguards under UK GDPR Article 46. The website is served by Vercel Inc. (US), and the serverless function that receives and validates your form submission is configured to run in Vercel’s Frankfurt region (eu-central) — so the form data is processed inside the EU before it reaches the database. Vercel publishes a Data Processing Agreement at vercel.com/legal/dpa that incorporates the standard contractual clauses and the UK IDTA as transfer mechanisms. Both Supabase’s and Vercel’s DPAs apply to this project through incorporation by reference in their standard terms — they have not been separately countersigned. If a server-side validation error occurs while you submit the form, a small fragment of your submitted answer (up to about 1,000 characters) may transiently appear in Vercel’s function logs for up to one hour before being auto-deleted; these logs are accessible only to me. Beyond the platform staff at Supabase and Vercel (who have administrative access to their infrastructure under their respective DPAs), I’m the only person who reads and analyses the data.",
      },
      {
        heading: "How long I keep it",
        body: "I keep your responses for as long as the project is active, plus up to 12 months after, to allow follow-up analysis and any final write-up of findings. After that, or whenever you ask, I delete your record permanently.",
      },
      {
        heading: "Your rights (UK GDPR)",
        body: "Under UK GDPR you have the right to: access a copy of your data; correct anything inaccurate; have your data deleted; restrict how I use it; receive your data in a portable format (e.g. a CSV); object to processing; and withdraw your consent at any time. To exercise any of these, email support@fenko.dev. I’ll respond within one month — usually much faster.",
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
    headline: "How this site works and what you’re agreeing to.",
    lastUpdated: "Last updated: 7 May 2026",
    sections: [
      {
        heading: "Who runs this site",
        body: "This website is operated by Dmytro Fenko (publishing as Dmitry Fenko), a UK sole trader trading as Fenko Team. It is not a company. It is not a startup. It is one person running a research project to understand what’s genuinely painful about running a UK sole trader business. The address for service of any document under these terms is Weston-super-mare, UK, BS23 1RH. You can reach me at hello@fenko.dev.",
      },
      {
        heading: "What this site is",
        body: "This is a research and discovery project, not a commercial product or paid service. There is no subscription, no paywall, no purchase involved. By using the site and completing the survey, you are participating in voluntary research.",
      },
      {
        heading: "The free access offer",
        body: "If you complete the survey, I intend in good faith to give you free access to whatever product I build — for 3 months after it launches. This is a genuine intention, not a binding contractual promise. It is contingent on a product actually being built. If the research finds no clear problem worth solving, I may not build anything, and no obligation to provide access will arise. If something is built, I will honour the offer. I won’t charge you without asking first.",
      },
      {
        heading: "Acceptable use",
        body: "This site is intended for adults aged 18 or over only — by completing the survey, you confirm you are at least 18. You may use the site only for its intended purpose: reading about the project and completing the survey honestly. You must not submit another person’s personal data without their knowledge or consent. You must not attempt to interfere with, scrape, overload, or reverse-engineer any part of the site. You must not submit false, harmful, or offensive content through the survey form. Knowingly submitting fabricated data wastes the research and is a breach of these terms; abusive, threatening, harassing, or defamatory content may also amount to civil or criminal offences under UK law (including the Communications Act 2003 s.127, the Malicious Communications Act 1988, the Defamation Act 2013, and the Online Safety Act 2023), and I reserve the right to delete the submission, ban the sender, and refer the material to the police or the relevant regulator. You will be solely responsible for any fines, penalties, or damages awarded against you as a result.",
      },
      {
        heading: "Ownership of content",
        body: "The text, design, layout, and source code of this website are mine, copyright © Dmytro Fenko 2026, and may not be copied, republished, or reused without written permission. Short quotation for the purpose of criticism, review, or commentary remains permitted under UK fair dealing rules (Copyright, Designs and Patents Act 1988, ss.29–30). You retain full ownership of the answers you submit through the survey. By submitting them, you grant me a non-exclusive, royalty-free, worldwide licence to use them for the research purposes described in the privacy notice — analysing patterns in the responses, summarising findings in any public write-up of the project, and informing the design of any product I subsequently build. If I quote your words publicly, I will do so anonymously unless you have explicitly told me you are happy to be named. You can withdraw this licence at any time by emailing me to request deletion of your record.",
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
        body: "Questions about these terms? Email support@fenko.dev. I’ll reply personally.",
      },
    ],
  },

  CookiesPage: {
    meta: {
      title: "Cookie notice — Sole Trader Discovery",
      description:
        "This site uses no cookies, no tracking, and no analytics. Here’s what that means.",
    },
    backLink: "← Back to home",
    label: "Cookie notice",
    headline: "No cookies. No tracking. Nothing.",
    lastUpdated: "Last updated: 7 May 2026",
    sections: [
      {
        heading: "The short version",
        body: "This website does not use cookies. It also does not store anything in your browser through localStorage, sessionStorage, IndexedDB, the Cache API, or any other client-side storage technology. It does not track you. It does not run analytics. It does not fingerprint your browser or device. There is no third-party script of any kind loaded on these pages.",
      },
      {
        heading: "What cookies are",
        body: "Cookies are small text files that a website stores in your browser to remember information about you — your preferences, session state, or behaviour across pages and visits. Many sites use them for analytics, advertising, login sessions, and A/B testing. This site does none of those things.",
      },
      {
        heading: "What this site actually does",
        body: "When you submit the survey, your answers are sent directly to a database (Supabase, hosted in the EU). That request does not involve cookies. Your browser does not store anything locally from this site — no entries in localStorage, no entries in sessionStorage, no IndexedDB databases, no service worker caches. There is no session token, no persistent identifier, and no tracking pixel. Under the Privacy and Electronic Communications Regulations 2003 (regulation 6), consent is required for any storage of information on a user’s terminal equipment beyond what is strictly necessary for a service the user has requested — this site avoids that situation entirely by storing nothing on your device.",
      },
      {
        heading: "If that ever changes",
        body: "If I ever add anything that sets a cookie or loads a tracking script — for example, a login feature or basic analytics — I will update this notice first, implement a proper consent mechanism, and tell you clearly what is being used and why. Until then, this page stays exactly as it is.",
      },
      {
        heading: "Contact",
        body: "If you have questions about this or notice something that looks like tracking behaviour, please email support@fenko.dev.",
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
    lastUpdated: "Last updated: 7 May 2026",
    sections: [
      {
        heading: "This is not professional advice",
        body: "Nothing on this website constitutes legal, tax, accounting, or financial advice. The site is a research project aimed at understanding the lived experience of UK sole traders. Any information or opinion expressed here is the personal view of one developer — not a qualified solicitor, accountant, or regulated financial adviser.",
      },
      {
        heading: "Tax and HMRC matters",
        body: "If you have questions about Self Assessment, VAT, National Insurance, allowable expenses, or any other tax matter as a sole trader, please consult HMRC directly at gov.uk/hmrc or speak to a qualified accountant. HMRC’s guidance is free and authoritative. This site is not a substitute for it.",
      },
      {
        heading: "Legal matters",
        body: "If you need legal advice — on contracts, intellectual property, employment, or anything else — please consult a qualified solicitor. The Law Society’s ‘Find a Solicitor’ tool at solicitors.lawsociety.org.uk is a good starting point.",
      },
      {
        heading: "No liability for decisions",
        body: "I accept no responsibility for any action you take or do not take based on anything you read on this site. The research findings, when published, will reflect patterns in survey responses — they are not recommendations. Always take independent professional advice before making business decisions.",
      },
      {
        heading: "Contact",
        body: "If something on this site has caused genuine concern, email support@fenko.dev and I will look at it.",
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
    meta: {
      title: "Something broke — Sole Trader Discovery",
      description:
        "The page hit an unexpected error. Try again, or email me directly if it keeps happening.",
    },
    label: "500 · Something broke",
    headline: "Something broke on my end.",
    body: "Sorry. The page hit an unexpected error. Try again — and if it keeps happening, write to me directly so I can look at it.",
    ctaPrimary: "Try again",
    ctaSecondary: "Back to home",
    contactPrompt: "Or email ",
    digestLabel: "Reference:",
  },
} as const;

export const PRIVACY_NOTICE_VERSION = "2026-05-07";
