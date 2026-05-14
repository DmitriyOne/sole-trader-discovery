# i18n через next-intl + Next.js 16 proxy.ts

**Дата:** 2026-05-14
**Статус:** Утверждено (ожидает review этой спеки от пользователя)
**Стек:** Next.js 16, React 19, next-intl последний (≥4.0)

## Цель

Добавить поддержку русского и украинского языков на discovery-сайте без поломки
существующих английских URL, уже опубликованных в промо-постах
(`https://sole-trader.fenko.dev/`, `/survey`, `/privacy` и т.д.).

## Чего НЕ делаем (non-goals)

- **Не переводим UK GDPR / legal-страницы.** Privacy, Terms, Cookies, Disclaimer
  остаются с английским контентом во всех локалях (применяется право
  Великобритании). Причина: машинный или даже ручной перевод юридического
  текста создаёт compliance-риск при минимальной выгоде — аудитория это
  RU/UK-говорящие *в Великобритании*, способные читать EN legal.
- **Без domain-based routing** (`ru.fenko.dev`). Один домен, только префикс в
  пути.
- **Без локализованных OG-image / иконок** в первой итерации. EN-версии
  используются для всех локалей. Можно добавить позже, если RU/UK reach
  вырастет.
- **Без интернационализации Zod-сообщений валидации.** UI-надписи
  переводятся; глубокие validation-сообщения остаются EN (редко, low-impact).
- **Не расширение проекта на RU / UA рынки.** Аудитория и позиционирование
  продукта не меняются — UK sole traders, UK GDPR posture, HMRC-релевантность.

## Аудитория и обоснование

Таргет: русско- и украиноязычные sole traders, **уже находящиеся в UK**. Та же
демография, что и текущий EN-сайт — другой язык. Privacy-постура, lawful basis,
data residency (EU/Frankfurt) и HMRC-фрейминг остаются UK-specific.

## Архитектура

### Стратегия роутинга

`localePrefix: 'as-needed'` — английский является default и **не несёт префикса**.

| URL                | Локаль | Заметки |
|--------------------|--------|---------|
| `/`                | en     | Существующий — без изменений |
| `/survey`          | en     | Существующий — без изменений. Сохраняет опубликованные ссылки живыми. |
| `/privacy`         | en     | Legal-страница, EN content |
| `/ru`              | ru     | Переведённый home |
| `/ru/survey`       | ru     | Переведённый survey |
| `/ru/privacy`      | ru     | EN legal content + RU disclaimer banner |
| `/uk`              | uk     | Переведённый home |
| `/uk/survey`       | uk     | Переведённый survey |
| `/uk/privacy`      | uk     | EN legal content + UK disclaimer banner |
| `/api/*`           | —      | Исключено из proxy matcher |

Порядок locale-negotiation (обрабатывается автоматически через `createMiddleware`):
1. URL prefix (`/ru`, `/uk`)
2. `NEXT_LOCALE` cookie (запоминает выбор пользователя)
3. `Accept-Language` header
4. Fallback на `defaultLocale` (en)

### Файловая структура

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                home
│   │   ├── survey/page.tsx
│   │   ├── privacy/page.tsx        legal — content всегда тянется из en dict
│   │   ├── terms/page.tsx           legal — то же
│   │   ├── cookies/page.tsx         legal — то же
│   │   ├── disclaimer/page.tsx      legal — то же
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── [...rest]/page.tsx      → notFound() — locale-aware 404 catch-all
│   ├── api/                        без изменений (submit, health)
│   ├── sitemap.ts                  обновлён — отдаёт hreflang entries
│   ├── robots.ts                   без изменений
│   ├── globals.css                 без изменений
│   ├── icon.tsx                    без изменений (одна иконка для всех локалей)
│   ├── apple-icon.tsx              без изменений
│   └── opengraph-image.tsx         без изменений
├── i18n/
│   ├── routing.ts                  defineRouting() — список локалей, prefix mode
│   ├── navigation.ts                типизированные Link/redirect/usePathname
│   └── request.ts                   getRequestConfig() — грузит словарь активной локали
└── shared/
    └── ui/locale-switcher/          новый компонент, используется в site-header

dictionary/
├── en.json                         все namespaces (зеркальная копия текущего TEXT)
├── ru.json                         перевод; legal-page namespaces = копия EN
└── uk.json                         перевод; legal-page namespaces = копия EN

proxy.ts                            createMiddleware(routing) в корне репо
next.config.ts                      обёрнут createNextIntlPlugin
```

### Зачем `[...rest]` catch-all

Без него попадание на `/ru/missing-page` отрендерило бы **корневой**
`not-found.tsx` (без locale context, на английском). Catch-all внутри
`[locale]` вызывает `notFound()`, который резолвится в ближайший
`not-found.tsx` — тот, что внутри `[locale]`, с правильной локалью и
переводами.

Паттерн взят из
[next-intl playground](https://github.com/amannn/next-intl/tree/main/examples/example-app-router-playground/src/app/%5Blocale%5D/%5B...rest%5D).

### Legal-страницы — content всегда EN

`src/app/[locale]/privacy/page.tsx` (и три соседа) вызывают
`getTranslations({ locale: 'en', namespace: 'PrivacyPage' })` — аргумент
`locale` принудительно ставит английский независимо от того, что в URL у
пользователя.

Структурные namespaces (`PrivacyPage`, `TermsPage`, `CookiesPage`,
`DisclaimerPage`) **дублируются дословно** в `ru.json` и `uk.json`, чтобы
сохранить единую форму словаря — это избавляет от special-case в
`getRequestConfig`. Цена: ~3000 слов × 2 = +30 KB размера файлов; gzip и
кэширование на Vercel это стерпят.

Компонент `LegalBanner` рендерится над legal-статьёй только на `/ru/*` и
`/uk/*` — берётся из локализованного namespace `LegalBanner`:

```json
{
  "LegalBanner": {
    "headline": "...",
    "body": "..."
  }
}
```

Скрыт на EN-локали — там disclaimer был бы избыточен (текст и так на английском).

## Конфигурация

### `src/i18n/routing.ts`

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru', 'uk'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true,
});

export type TLocale = (typeof routing.locales)[number];
```

### `src/i18n/request.ts`

```ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../dictionary/${locale}.json`)).default,
  };
});
```

Поле `locale` в return-объекте **обязательно** в next-intl v4.

### `src/i18n/navigation.ts`

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

Вся внутренняя навигация (Link, redirect) идёт через эти обёртки — они
автоматически добавляют locale-префикс.

### `proxy.ts` (корень репо)

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Матчит всё кроме api, _next internals, файлов с точкой
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

Заметка для Next.js 16: файл называется `proxy.ts`, экспортируется default
функцией (имя `proxy`, если custom-обёртка). `middleware.ts` ещё работает в 16
с deprecation warning — мы сразу идём на `proxy.ts`.

### `next.config.ts`

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
};

export default withNextIntl(nextConfig);
```

## Слой данных

### Структура словаря

`dictionary/en.json` — дословная копия текущего объекта `TEXT`:

```json
{
  "GlobalMeta": { "title": "...", "description": "..." },
  "Footer": { "issue": "...", "contact": "..." },
  "HomePage": { "meta": {...}, "strip": {...}, "hero": {...}, "deal": {...} },
  "SurveyPage": { ... },
  "PrivacyPage": { ... },
  "TermsPage": { ... },
  "CookiesPage": { ... },
  "DisclaimerPage": { ... },
  "NotFoundPage": { ... },
  "ErrorPage": { ... },
  "LegalBanner": {
    "headline": "Legal text in English",
    "body": "For legal accuracy, this notice is published in English only. UK law applies. Contact support@fenko.dev with questions."
  },
  "LocaleSwitcher": {
    "label": "Language",
    "en": "English",
    "ru": "Русский",
    "uk": "Українська"
  }
}
```

**Константы `PRIVACY_NOTICE_VERSION` и `PRIVACY_ICO_REGISTRATION_OPTIONAL`**
переезжают из `text.ts` в `src/shared/config/legal-meta.ts` — это server-only
metadata, а не текстовые строки, и им не место в словаре.

### Миграция БД

```sql
-- supabase migrations
alter table responses
  add column language text not null default 'en'
    check (language in ('en', 'ru', 'uk'));
```

`insertResponse` в `src/entities/response/api/insert.ts` читает активную локаль
из request-headers (`x-next-intl-locale`, выставляется proxy-ем) и стампит её в
строку — server-side, без участия клиента.

`responseSchema` в `src/entities/response/model/schema.ts` **не** меняется —
`language` стампится сервером, как `submitted_at`, `consent_at`,
`notice_version`. Клиент не сможет подделать.

## Компоненты

### Page-обёртки (в `src/app/[locale]/<route>/page.tsx`)

Паттерн (на примере home):

```tsx
import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/pages/home';

type TPageProps = { params: Promise<{ locale: string }> };

export default async function Home({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);    // включает static rendering с locale-контекстом
  return <HomePage />;
}

export async function generateMetadata({ params }: TPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.meta' });
  return { title: t('title'), description: t('description') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

### Views читают переводы

`src/views/home/HomePage.tsx` переходит с:
```tsx
import { TEXT } from '@/shared/config/text';
<h1>{TEXT.HomePage.hero.headlinePart1}</h1>
```
на:
```tsx
import { useTranslations } from 'next-intl';
const t = useTranslations('HomePage.hero');
<h1>{t('headlinePart1')}</h1>
```

Для server components — `getTranslations()` из `next-intl/server`.
Для client components — `useTranslations()` из `next-intl`.

### LocaleSwitcher

Расположение: в site-header widget, справа.

Поведение: клик по trigger (`EN ▾`) показывает другие локали, клик по локали
переключает.

```tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations('LocaleSwitcher');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-rust"
        aria-label={t('label')}
        aria-expanded={open}
      >
        {active.toUpperCase()} ▾
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-2 bg-paper border border-rule py-1 min-w-[140px] z-10">
          {routing.locales
            .filter((l) => l !== active)
            .map((l) => (
              <li key={l}>
                <Link
                  href={pathname}
                  locale={l}
                  className="block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-rust hover:bg-bg"
                  onClick={() => setOpen(false)}
                >
                  {t(l)}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
```

Скрыт на legal-страницах (`privacy`, `terms`, `cookies`, `disclaimer`) — контент
там EN независимо от switcher, показывать его было бы вводящим в заблуждение.
Детектируется через `usePathname()` (содержит сегмент).

### Обновление sitemap

`src/app/sitemap.ts` отдаёт по entry на каждую non-legal страницу × каждую
локаль, плюс единственную EN-версию каждой legal-страницы:

```ts
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://[PLACEHOLDER: site URL]';

export default function sitemap(): MetadataRoute.Sitemap {
  const localised = ['', '/survey'];           // home, survey
  const legal = ['/privacy', '/terms', '/cookies', '/disclaimer'];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of localised) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${SITE}${prefix}${path}`,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE}${l === routing.defaultLocale ? '' : `/${l}`}${path}`
            ])
          )
        }
      });
    }
  }

  for (const path of legal) {
    entries.push({ url: `${SITE}${path}` });   // EN only — без alternates
  }

  return entries;
}
```

## План миграции (общий — детальный план уйдёт в writing-plans)

1. Установить `next-intl`, обернуть `next.config.ts`
2. Создать `src/i18n/{routing,request,navigation}.ts`, `proxy.ts`
3. Создать `dictionary/en.json` из `text.ts`; `ru.json` и `uk.json` как
   draft-переводы (legal-namespaces = дословная копия EN)
4. Перенести `src/app/{page.tsx,layout.tsx,survey,privacy,terms,cookies,disclaimer,not-found.tsx,error.tsx}`
   под `src/app/[locale]/`. Добавить `[...rest]/page.tsx`, обновить каждый
   page-wrapper чтобы принимал `params: Promise<{ locale }>`, вызвать
   `setRequestLocale`.
5. Мигрировать views с `TEXT.X.y` → `useTranslations('X')(...)` /
   `getTranslations()`
6. Собрать `LocaleSwitcher` компонент, монтировать в `site-header`
7. Собрать `LegalBanner` компонент, монтировать над legal-article на не-EN
   локалях
8. Обновить `sitemap.ts` для hreflang
9. Добавить Supabase-миграцию: колонка `language` в `responses`
10. Обновить `insertResponse` чтобы стампить language из request-header
11. Удалить `src/shared/config/text.ts` (предварительно вытащив
    `PRIVACY_NOTICE_VERSION`)
12. Проверить: `npm run build` регенерирует typed-routes; ручной smoke на `/`,
    `/ru`, `/uk`, `/survey`, `/ru/survey`, `/privacy`, `/ru/privacy`

## Риски и mitigations

| Риск | Mitigation |
|------|------------|
| Существующий `/survey` URL ломается → опубликованные посты мёртвые | `localePrefix: 'as-needed'` оставляет EN в корне. Проверено: `/survey` остаётся как `/survey`. |
| Перевод legal-текста создаёт compliance-liability | Legal-страницы всегда рендерят EN content через `getTranslations({locale: 'en'})`. RU/UK пользователи видят EN с локализованным disclaimer-баннером. |
| Переводы survey-вопросов звучат робото, страдает качество ответов | Я делаю draft адаптивный (не буквальный), помечаю сомнительные фразы `[REVIEW]`, пользователь review-ит перед запуском. |
| Bundle size растёт от 3 словарей загруженных eagerly | next-intl грузит только активный словарь per request через dynamic import в `request.ts`. |
| Колонка `language` добавлена к existing rows | Default `'en'` бэкфилит существующие строки безопасно. |
| EN-only OG-images в RU/UK previews выглядят несовпадающе | Приемлемо для MVP; локализованную OG-генерацию можно добавить позже. |
| Vercel cron / GitHub Actions health-ping ломается | `/api/health` исключён из proxy matcher. Без изменений. |

## Открытые пункты (после implementation)

- **Translation review pass.** Я даю первый draft; пользователь review-ит
  строки помеченные `[REVIEW]`.
- **Локализованные OG-images.** Откладываем до момента / если RU или UK reach
  вырастет настолько, чтобы это имело значение.
- **Локализованные supabase email-подтверждения.** Out of scope — сегодня
  автоматических email нет.

## Что НЕ меняется

- `globals.css`, Tailwind конфиг, шрифты, theme-tokens
- `next.config.ts` `reactStrictMode`, `typedRoutes`
- Все API routes (`/api/submit`, `/api/health`)
- Vercel deployment, GitHub Actions health-ping (matcher исключает `/api`)
- Английский текст privacy notice (по-прежнему authoritative)
- ICO-регистрация, controller identity, contact email
- Survey schema (`responseSchema`) — `language` стампится сервером
