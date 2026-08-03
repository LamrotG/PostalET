# PostalEt — Technical Presentation Notes

> A transparency-first Ethiopian postal code directory.
> **Live URL:** https://postal-et.vercel.app
> **GitHub:** https://github.com/LamrotG/PostalET

---

## 1. Project Overview & Motivation

PostalEt is a **web application** that lets users search for and discover Ethiopian postal codes. The core problem it solves: **there is no trustworthy place to search Ethiopian postal codes.** Most websites copy data from each other, making it impossible to know whether a postal code is correct.

The product's core philosophy is **"transparency before certainty"** — every postal code is treated as a **claim with an attributed source**, not an assumed fact. Users always see:
- Where the data comes from (source name + URL)
- How confident we are (confidence rating)
- When it was verified
- What remains unknown

---

## 2. Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.9 | React framework (App Router, Server Components, API routes) |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Static type safety |
| **Tailwind CSS** | ^4 | Utility-first styling |
| **shadcn/ui** | ^4.11.1 | UI component primitives |
| **Supabase** (JS client) | ^2.108.2 | PostgreSQL database access |
| **lucide-react** | ^1.21.0 | Icon library |
| **Radix UI** | ^1.6.0 | Headless UI primitives (used by shadcn) |
| **class-variance-authority** | ^0.7.1 | Variant management for UI components |
| **clsx + tailwind-merge** | — | Conditional class merging utility |
| **tw-animate-css** | ^1.4.0 | Tailwind animation support |
| **ESLint 9** | — | Linting (with `eslint-config-next`) |
| **Vercel** | — | Hosting & deployment |

### Why Next.js?
- **App Router** with React **Server Components** → server-side data fetching renders fast, SEO-friendly pages (Supabase queries run on the server).
- **Built-in API routes** (`app/api/*`) → the search endpoint needs no separate backend.
- **Dynamic route segments** (`[slug]`) → clean URLs for each place (`/place/adama`).
- **File-based metadata / SEO** → `metadata`, `sitemap.ts`, `robots.ts`, JSON-LD structured data.
- **Streaming & loading states** → `loading.tsx` files per route show skeleton loaders.

### Why Supabase?
PostgreSQL hosted in the cloud with a typed JS client. Stores two core tables: `places` and `postal_code_claims` (see Database Schema below).

---

## 3. Software Engineering Considerations

### 3.1 Architecture Pattern: Server Components + Client Islands
The app follows **Next.js App Router best practice** — the "server-first" model:

- **Server Components** (default): fetch data from Supabase and render HTML on the server. Includes: `page.tsx`, `layout.tsx`, `directory`, `place/[slug]`, `about`, `robots.ts`, `sitemap.ts`.
- **Client Components** (marked with `"use client"`): only the interactive parts are hydration islands. Includes: `search.tsx`, `nav.tsx`, `copy-postal-code.tsx`, `source-attribution.tsx`, `language-context.tsx`.

This dramatically reduces client-side JavaScript — only interactive widgets ship JS, while the rest is static server-rendered HTML.

### 3.2 Type Safety (TypeScript)
- Strict mode enabled (`"strict": true` in tsconfig).
- A central types module (`lib/types.ts`) defines domain models: `Place`, `PlaceWithClaims`, `PostalCodeClaim`, `ResolvedPostalCode`, `ConfidenceLevel`, `RegionInfo`.
- Path alias `@/*` maps to project root (clean imports like `@/lib/data`).

### 3.3 Modular Separation of Concerns
Clear layers, each with a single responsibility:

| Layer | Files | Responsibility |
|---|---|---|
| **Data access** | `lib/data.ts`, `lib/supabase.ts` | All Supabase queries & business logic |
| **Domain types** | `lib/types.ts` | TypeScript interfaces for domain models |
| **Business logic** | `lib/data.ts` (resolvePostalCode), `lib/sources.ts` | Confidence resolution engine, source metadata |
| **Localization** | `lib/localize.ts`, `lib/language-context.tsx`, `lib/language-server.ts` | English ↔ Amharic |
| **Utilities** | `lib/utils.ts` | `cn()` class merge helper |
| **UI components** | `components/*` | Presentational + interactive UI |
| **Routing** | `app/*` | Route pages, API, and metadata |

### 3.4 Clean Code Practices
- **Small, focused functions** — e.g., `resolvePostalCode`, `getConfidenceLabel`, `localizePlace`.
- **Named exports** for all components/functions.
- **Descriptive identifiers** — `searchPlaces`, `isGenericSourceUrl`, `getDirectoryUrl`.
- **Immutability** — data is spread (`{...place, postal_code_claims: claims}`), never mutated.
- **Error handling** — try/catch in async flows (search fetch), `notFound()` for missing records.

### 3.5 Security
- **Removed `X-Powered-By` header** (`poweredByHeader: false`).
- **Security headers** in `next.config.ts`:
  - `X-Frame-Options: DENY` (anti-clickjacking)
  - `X-Content-Type-Options: nosniff` (MIME sniffing protection)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (blocks camera/mic/geolocation)
- **Strict mode** enabled.
- **Supabase anonymous key only** — no server secrets exposed (RLS expected on the DB side).
- External links use `rel="noopener noreferrer"`.

### 3.6 Accessibility (a11y)
- Semantic HTML (`header`, `nav`, `main`, `footer`, `section`, `ul/li`).
- ARIA attributes: `aria-expanded`, `aria-controls`, `role="combobox"`, `role="listbox"`, `role="option"`, `aria-selected`, `aria-activedescendant`, `aria-label`.
- Full **keyboard navigation** in search dropdown: ArrowUp/ArrowDown/Enter/Escape.
- Focus management + click-outside handler.
- Loading states announced via `role="status"`.
- Color-coded confidence ratings also have text labels (not color-only).

### 3.7 Performance
- **Server-side rendering** reduces client bundle.
- **Client components are minimal** (search, nav, copy button).
- **Skeleton loading** (streaming) on route changes (`loading.tsx`).
- **Debounced search** (200ms) in `search.tsx`.
- Query limits (`.limit(20)`, `.limit(12)`, `.limit(6)`) prevent large payloads.
- Home page fetches 3 things **in parallel** via `Promise.all`.

### 3.8 SEO
- **Dynamic metadata generation** per place (`generateMetadata`) with title templates.
- **JSON-LD structured data**: `WebSite` + `SearchAction` (home), `BreadcrumbList` + `Place` (place pages).
- **Dynamic sitemap** (`sitemap.ts`) generated from actual DB data (places + regions).
- **robots.txt** (`robots.ts`) disallows `/api/`.
- **OpenGraph + Twitter cards** in layout metadata.
- **Canonical URLs** and **alternates**.

---

## 4. Database Schema (Supabase / PostgreSQL)

Two main tables (inferred from `lib/data.ts` and `lib/types.ts`):

### `places`
Describes a geo-location (a place/city/town).

| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | English name (e.g., "Adama") |
| `full_name` | text | Full English name |
| `region` | text | Region (e.g., "Oromia") |
| `zone` | text/null | Zone within region |
| `place_type` | text | e.g., city, town, woreda |
| `slug` | text | URL-friendly identifier |
| `search_text` | text | Denormalized English search index |
| `latitude` | numeric/null | Coordinates |
| `longitude` | numeric/null | Coordinates |
| `name_am` | text/null | Amharic name |
| `full_name_am` | text/null | Amharic full name |
| `region_am` | text/null | Amharic region |
| `zone_am` | text/null | Amharic zone |
| `search_text_am` | text/null | Amharic search index |

### `postal_code_claims`
A claim that a source assigns a postal code to a place (a **claim, not a fact**).

| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `place_id` | uuid | FK → places.id |
| `postal_code` | text | The claimed postal code |
| `source_name` | text | Name of the data source |
| `source_url` | text/null | Link to the source |
| `source_tier` | enum | `official` / `aggregator` / `community` / `unknown` |
| `source_independence` | enum | `primary` / `secondary` / `derivative` |
| `verified_at` | timestamp/null | When the code was verified |
| `notes` | text/null | Additional context |

### Data Design Philosophy
- Places exist **independently** of postal codes (a location appears even if we don't know its code).
- Postal codes are stored as **multiple claims per place**, enabling the confidence-resolution algorithm.

---

## 5. Confidence Algorithm (`resolvePostalCode` in `lib/data.ts`)

This is a key business-logic function. Given an array of claims for a place, it returns a `ResolvedPostalCode { postal_code, confidence, claim_count, sources }`.

Logic:

1. **No claims** → `confidence: "unverified"`, `postal_code: null`.
2. **Has official claim** (`source_tier === "official"`) → use that code, `confidence: "high"`.
3. **Multiple sources agree** (≥2 same code) → `confidence: "medium"`.
4. **Otherwise** (single source / disagreement) → use most-common code, `confidence: "low"`.

Confidence labels (`getConfidenceLabel`):
- **High** — verified by an official source
- **Medium** — multiple sources agree
- **Low** — single or conflicting sources
- **Unverified** — no claims found

---

## 6. Data Sources (`lib/sources.ts`)

### Primary Source
- **Youbianku Ethiopia Postal Codes** — comprehensive directory organized by region, zone, locality.

### Supporting References
- **ET Postcodes Doc (Sep 2019)** — archived dataset.
- **TechHabesha Postal Code Guide** — reference guide.
- **PostcodeBase Ethiopia** — searchable database.

### Helper logic
- `isGenericSourceUrl(url)` — detects if a source link is a "hub" page (vs. a specific location page).
- `getDirectoryUrl(url)` — for Youbianku generic links, returns an anchor to the postcode list section.

> **Important:** Open Karta may be used only for *geographic validation* of locations — **never** to infer/estimate postal codes.

---

## 7. Data Flow & Architecture

```
Browser (Search.tsx)
   │  fetch('/api/search?q=...&lang=...')  [debounced 200ms]
   ▼
app/api/search/route.ts  (Server Component API route)
   │  validates query length ≥ 2, extracts lang
   ▼
lib/data.ts → searchPlaces(query, lang)
   │  Supabase query (places)
   ▼
Supabase PostgreSQL → JSON response → Search dropdown renders
```

**Home page flow (Server Component):**
```
app/page.tsx
  ├─ getPopularPlaces()      → popular places grid
  ├─ getRegions()            → region directory
  └─ getServerLanguage()     → reads "lang" cookie
       (all in parallel via Promise.all)
```

**Place detail flow:**
```
app/place/[slug]/page.tsx
  ├─ getPlaceBySlug(slug)     → place + its claims
  ├─ resolvePostalCode(claims) → confidence & code
  ├─ getRelatedPlaces(place)   → same-region places
  └─ generateMetadata()        → dynamic SEO metadata
```

---

## 8. File-by-File Breakdown

### Root configuration
| File | Purpose |
|---|---|
| `package.json` | Dependencies & scripts (`dev`, `build`, `start`, `lint`) |
| `next.config.ts` | Security headers, `reactStrictMode`, disabled `poweredByHeader` |
| `tsconfig.json` | Strict TypeScript, path alias `@/*` |
| `postcss.config.mjs` | Tailwind v4 plugin |
| `eslint.config.mjs` | Next.js ESLint flat config |
| `components.json` | shadcn/ui config |
| `.env.example` | Environment variable template (Supabase URL/anon key) |
| `.gitignore` | Ignore node_modules, .next, env files |

### `app/` — Routes & Pages
| File | Type | What it does |
|---|---|---|
| `app/layout.tsx` | Server | Root layout: fonts (Figtree + Geist Mono), metadata, `LanguageProvider`, Nav, Footer, global CSS |
| `app/page.tsx` | Server | Home: fetches popular places + regions + lang in parallel; renders search, popular places, region directory; injects JSON-LD `WebSite` schema |
| `app/loading.tsx` | Server | Home loading skeleton (`SearchSkeleton`) |
| `app/robots.ts` | Server | robots.txt — allow all, disallow `/api/`, sitemap link |
| `app/sitemap.ts` | Server | Dynamic sitemap: static pages + all regions + all places from DB |
| `app/globals.css` | CSS | Tailwind import, design tokens (theme), fonts |
| `app/favicon.svg` | Asset | Site icon |
| `app/about/page.tsx` | Server | About & Help: explains postal codes, how search works, confidence levels, sources, limitations |
| `app/api/search/route.ts` | Server | Search API: parses `q` + `lang`, validates min length, returns JSON places |
| `app/directory/page.tsx` | Server | Browse-by-region listing page |
| `app/directory/loading.tsx` | Server | Directory skeleton |
| `app/directory/[region]/page.tsx` | Server | All places in a region, with breadcrumb + localized labels (`generateMetadata`, `notFound`) |
| `app/directory/[region]/loading.tsx` | Server | Region skeleton |
| `app/place/[slug]/page.tsx` | Server | Place detail: postal code card, confidence badge, sources, related places, JSON-LD |
| `app/place/[slug]/loading.tsx` | Server | Place skeleton |
| `app/place/[slug]/not-found.tsx` | Server | 404 UI for missing place |

### `components/` — UI
| File | Type | What it does |
|---|---|---|
| `components/search.tsx` | Client | Autocomplete search with debounce, dropdown, loading skeleton, keyboard navigation, ARIA combobox, empty states |
| `components/nav.tsx` | Client | Header nav, language toggle (EN/AM), dark-mode toggle (localStorage + prefers-color-scheme) |
| `components/footer.tsx` | Server | Footer with links & transparency statement |
| `components/directory.tsx` | Server | Region card grid → links to `/directory/[region]` |
| `components/popular-places.tsx` | Server | Popular places grid with localized names |
| `components/copy-postal-code.tsx` | Client | Copy-to-clipboard button (with fallback `execCommand`) |
| `components/source-attribution.tsx` | Client | Collapsible "Data References" panel listing primary + supporting sources |
| `components/skeletons.tsx` | Server | Reusable shimmer skeletons: `SearchSkeleton`, `PlaceSkeleton`, `DirectorySkeleton`, `RegionSkeleton` |
| `components/ui/badge.tsx` | Server | shadcn Badge primitive (variants) |

### `lib/` — Logic & Data
| File | What it does |
|---|---|
| `lib/supabase.ts` | Creates the Supabase client from env vars |
| `lib/types.ts` | `Place`, `PostalCodeClaim`, `ResolvedPostalCode`, `ConfidenceLevel`, `RegionInfo`, `PlaceWithClaims` |
| `lib/data.ts` | Data-access layer: `searchPlaces`, `getPlaceBySlug`, `getPopularPlaces`, `getPlacesByRegion`, `getRegions`, `getRelatedPlaces`, `resolvePostalCode`, `getConfidenceLabel` |
| `lib/language-context.tsx` | Client React context for EN↔AM language with cookie persistence + `router.refresh()` |
| `lib/language-server.ts` | Reads the `lang` cookie on the server for server components |
| `lib/localize.ts` | `localizePlace()` / `localizeRegionName()` — return Amharic or English based on lang |
| `lib/sources.ts` | Source metadata: `PRIMARY_SOURCE`, `SUPPORTING_SOURCES`, `ALL_SOURCES`, `UPU_SOURCE`, `isGenericSourceUrl`, `getDirectoryUrl` |
| `lib/utils.ts` | `cn()` — merges `clsx` + `tailwind-merge` class strings |

---

## 9. Localization Architecture (English ↔ Amharic)

This is a notable engineering detail — **full bilingual support without a complex i18n library**.

- A cookie `lang=en|am` stores the user's language preference.
- **Client side:** `LanguageContext` (`language-context.tsx`) reads/writes the cookie, and calls `router.refresh()` so Server Components re-render in the new language.
- **Server side:** `getServerLanguage()` (`language-server.ts`) reads the same cookie in Server Components and passes `lang` down.
- **Data layer:** the `places` table duplicates fields in Amharic (`name_am`, `region_am`, `zone_am`, `search_text_am`).
  - Search queries switch the `ilike` column (`search_text` vs `search_text_am`).
- **Presentation layer:** `localizePlace()` / `localizeRegionName()` pick the Amharic field if `lang === "am"`, falling back to English if missing.

### Why not a library like `next-intl`?
The scope is only 2 languages, and the data itself is dual-lingual in the DB. A custom cookie + context-based approach is lightweight, has zero added dependencies, and keeps Server Components fully capable of localized rendering.

---

## 10. State Management

There is **no global state library** (no Redux/Zustand). State management is handled by:

| Concern | Mechanism |
|---|---|
| Language | React Context (`LanguageContext`) + cookie |
| Theme (dark/light) | Local component state + `localStorage` + CSS class on `<html>` |
| Search state | Local component state + `useCallback`/`useEffect` with debounce |
| UI state (dropdown, accordion) | Local component state |

This is a deliberate choice — the app is mostly server-rendered, so only the interactive bits need client state, and they're small enough for local state.

---

## 11. Key Implementation Details & Edge Cases

### Search (the most complex component)
- **Debounce (200ms)** — reduces DB hits while typing.
- **Minimum query length (2 chars)** — avoids useless queries.
- **Detects if query is numeric** → treats it as a postal code search (joins claims to find matching places).
- **Language-aware column selection** — searches `search_text` or `search_text_am`.
- **Dropdown states:** `idle → typing → loading → results | no-results`.
- **Keyboard nav:** ArrowUp/Down moves `activeIndex`, Enter navigates, Escape closes.
- **Click-outside** closes dropdown (mousedown listener).
- **Accessible** combobox pattern with `aria-activedescendant`.

### Copy-to-clipboard fallback
- Uses the modern `navigator.clipboard.writeText()`.
- Falls back to a hidden `<textarea>` + `document.execCommand("copy")` for older/insecure contexts.

### Dark mode
- On mount: checks `localStorage` → falls back to `prefers-color-scheme`.
- Toggles `dark` class on `<html>`, persists to localStorage.

### Route handling
- `params` is treated as a **Promise** (`params: Promise<{slug}>`, awaited) — required in Next.js 15+/16.
- `notFound()` for missing places/regions.
- `decodeURIComponent` on region path params for encoded spaces.

### Metadata / SEO edge cases
- `generateMetadata` for place pages injects the postal code into the `<title>` (e.g., "Adama — Postal Code 1234").
- Structured data: `BreadcrumbList`, `Place` with `PostalAddress` (including country code "ET").
- `sitemap.ts` and `robots.ts` are **dynamic** — they query the DB so they auto-update as data grows.

---

## 12. Testing / QA (current state)

The project does **not** currently ship automated unit/E2E tests (no test script in `package.json`). Quality is maintained through:
- **TypeScript strict mode** (compile-time checks).
- **ESLint** (`npm run lint`) with `eslint-config-next` (React + Next.js best-practice rules).
- **Next.js production build** (`npm run build`) — catches type errors, invalid imports, and build-time issues.
- **Manual QA** — the app is designed around defensive edge cases:
  - No results / empty states
  - Places without postal codes
  - Conflicting source claims
  - Debounced search to prevent request spam
  - Clipboard API failure fallback

---

## 13. Deployment & DevOps

- **Hosting:** Vercel (production: `postal-et.vercel.app`).
- **Environment variables** (`.env`):
  - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous public key
- **Build pipeline:** `npm run build` → `next build` (via Vercel's Zero-Config deployment).
- **Git:** hosted on GitHub (`LamrotG/PostalET`).
- **Data persistence:** Supabase (PostgreSQL) — fully managed, separated from app code.

### Why Vercel?
- Native Next.js support (zero-config).
- Automatic preview deployments on PRs.
- Edge caching + global CDN for static pages.
- Environment variable management built-in.

---

## 14. Potential Improvements / Roadmap

- **Automated tests** — add Jest/Vitest for `resolvePostalCode` logic; Playwright for E2E search flows.
- **Caching** — add ISR (Incremental Static Regeneration) or `unstable_cache` to reduce DB reads for popular/static pages.
- **Pagination** — for regions with many places (currently single page with many cards).
- **Full-text search** — upgrade from `ilike` to Postgres full-text search (`tsvector`) or pg_trgm for better fuzzy matching.
- **Rate limiting** — on the `/api/search` endpoint.
- **RLS policies** — explicitly configure Supabase Row-Level Security.
- **Data seeding script** — to make DB setup reproducible for new contributors.
- **Error monitoring** — integrate Sentry or Vercel Analytics.

---

## 15. Presentation Talking Points (Summary)

If you need a 60-second technical summary for the presentation:

> **PostalEt** is a server-rendered **Next.js 16** application with **React 19**, **TypeScript** (strict), **Tailwind CSS 4** and **shadcn/ui**. It runs on **Supabase** (PostgreSQL) and is deployed on **Vercel**.
>
> The app follows Next.js **App Router architecture**: Server Components fetch data and render HTML on the server; only interactive widgets (search, nav, copy-button, language toggle) are Client Components ("islands").
>
> Domain data is modeled as **places** and **postal_code_claims** — a postal code is never a fact, it's a *claim with an attributed source*. A **confidence algorithm** (`resolvePostalCode`) turns multiple claims into a confidence rating: high (official source), medium (multiple agreeing sources), low (single/conflicting), or unverified.
>
> It's fully **bilingual** (English ↔ Amharic) using a lightweight cookie-based context system rather than a heavy i18n library. It's **SEO-optimized** with dynamic metadata, JSON-LD schema, and a data-driven sitemap. It's designed with **accessibility** (ARIA combobox, keyboard navigation), **security headers**, and **performance** in mind (server rendering, skeleton loading, debounced search).
>
> The core differentiator: **transparency before certainty** — every result shows its source, confidence level, and verification date, and we never fabricate a code we can't verify.
