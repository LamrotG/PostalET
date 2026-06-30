# PostalEt

A transparency-first Ethiopian postal code directory.

PostalEt exists because there is no trustworthy place to search Ethiopian postal codes. Most websites copy data from one another, making it difficult to know whether a postal code is actually correct. PostalEt takes a different approach: every postal code is treated as a claim, not a fact. We always show where data comes from, how confident we are, and what is unknown.

The goal is **transparency before certainty**.

## Features

- **Postal code search** — search by place name, city, zone, region, or postal code with instant results
- **Confidence ratings** — every postal code shows a confidence level (high, medium, low, unverified) based on source verification
- **Source attribution** — every page shows where data comes from with links to original sources
- **Copy to clipboard** — click any postal code to copy it instantly
- **Smart empty states** — helpful guidance when a postal code is unavailable, including placeholder suggestions for international forms
- **Loading indicators** — skeleton loaders on every route transition
- **About & Help** — comprehensive guide explaining Ethiopian postal codes, how they work, and what to do when one is unavailable
- **SEO optimized** — unique metadata, JSON-LD structured data, sitemap, and robots.txt for every page
- **Accessible** — keyboard navigation, ARIA attributes, semantic HTML, and proper focus management
- **Mobile responsive** — works on all screen sizes

## Technology Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework (App Router, Server Components) |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | UI component primitives |
| [Supabase](https://supabase.com) | PostgreSQL database |
| [Lucide](https://lucide.dev) | Icons |
| [Vercel](https://vercel.com) | Hosting and deployment |

## Data Sources

PostalEt references publicly available postal code directories. We distinguish between our primary source and supporting references.

### Primary Source

- [Youbianku Ethiopia Postal Codes](https://en.youbianku.com/Ethiopia) — comprehensive Ethiopian postal code directory organized by region, zone, and locality

### Supporting References

- [Ethiopian Postal Codes (September 2019)](https://www.scribd.com/document/577572522/ET-Postcodes-Sep19-v1-230919) — archived dataset
- [TechHabesha Postal Code Guide](https://techhabesha.com/ethiopian-postal-code-zip-code/) — Ethiopian postal code reference
- [PostcodeBase Ethiopia](https://eth.postcodebase.com/) — searchable postal code database

The supporting references contain information that is largely consistent with the primary source and are provided for transparency and additional verification.

[Open Karta](https://open.karta.et/) may be used for geographic validation of locations but is **never** used to infer or estimate postal codes.

### Accuracy Policy

- We never fabricate, estimate, or infer postal codes
- We never guess a code based on nearby locations
- If a postal code cannot be verified, we clearly state that it is unavailable
- Every postal code is a claim backed by a source, not an assumed fact

## APIs & Services

- Supabase - PostgreSQL database for places and postal code claims 




## Folder Structure

```
app/
  about/           About & Help page
  api/search/      Search API endpoint
  directory/       Region directory pages
  place/[slug]/    Individual place pages
  layout.tsx       Root layout with metadata
  page.tsx         Home page
  sitemap.ts       Dynamic sitemap
  robots.ts        Robots configuration
components/
  ui/              shadcn/ui primitives (badge)
  copy-postal-code.tsx
  directory.tsx
  footer.tsx
  nav.tsx
  popular-places.tsx
  search.tsx
  skeletons.tsx
  source-attribution.tsx
lib/
  data.ts          Data access functions
  sources.ts       Source definitions
  supabase.ts      Supabase client
  types.ts         TypeScript types
  utils.ts         Utility functions
```





