# Threadbase Landing Implementation Plan

**Goal:** Build a static Next.js landing page in this workspace for Claude Code History Browser, following the approved Signal Console design and the content structure from `nextjs-landing-page-prompt.md`.

**Architecture:** Bootstrap a Next.js 15 App Router project in the current directory, define all copy and typed data in `lib/content.ts`, compose the page in `app/page.tsx`, and keep section components presentational. Use Framer Motion for reveal choreography and `tailwindcss-motion` for high-quality micro-interactions while preserving static export compatibility.

**Tech Stack:** Next.js 15, React 19, TypeScript strict mode, Tailwind CSS v4, Framer Motion, `tailwindcss-motion`, shadcn/ui, Geist Sans, Geist Mono.

## Execution Order

1. Verify current official docs for Next.js 15, Tailwind CSS v4, Framer Motion, and `tailwindcss-motion`.
2. Scaffold the Next.js app in the current directory and install dependencies.
3. Write failing tests for page composition and content wiring.
4. Create the typed `lib/content.ts` data model.
5. Add global visual system styles and shared UI/motion helpers.
6. Implement sections incrementally:
   - `Hero`
   - `ProblemSection`
   - `FeaturesGrid`
   - simplified `PlatformPicker`
   - `Screenshots`
   - `HonestCons`
   - `QuickStart`
   - `Footer`
7. Configure metadata, fonts, and `next.config.ts` static export settings.
8. Add restrained interaction polish with `tailwindcss-motion`.
9. Run final verification: lint, build, tests, `any` grep, dev server, responsive/manual checks.

## Non-Negotiables

- All user-facing copy lives in `lib/content.ts`
- No `any` types
- Semantic sections and headings
- Static export compatible
- Framer Motion for reveal choreography
- `tailwindcss-motion` for additional interaction polish
- Visual direction: dark, steel-blue/cyan-led, technical, and professional
