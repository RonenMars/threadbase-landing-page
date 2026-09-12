# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Optional AI-assistant tooling this repo declares (plugins, MCP servers, and how to install them for Claude Code or Codex): [docs/agents/tooling.md](docs/agents/tooling.md)

## Project

Threadbase landing page — Next.js 16 + React 19 + TypeScript marketing site. Uses the App Router (not pages router).

## Commands

```bash
npm run dev          # start dev server (port 3000)
npm run build        # production build
npm run lint        # Biome lint + format check, then Next.js/Tailwind ESLint rules
npm run lint:fix    # auto-fix ESLint rules, then Biome lint + formatting
npm run format      # format with Biome
vitest run           # unit tests (one-shot)
vitest               # unit tests (watch)
npm run test:visual  # Playwright visual regression (spins up dev server)
npm run test:visual:update  # update Playwright snapshots after intentional visual changes
```

## Architecture

- `app/` — App Router routes and layouts
- `components/` — shared React components
- `lib/` — utilities and content data
- `tests/` — unit tests (vitest) and visual regression (Playwright)
- Path alias `@/*` maps to the **project root**, not `src/`

## Tailwind v4

There is no `tailwind.config.ts`. All Tailwind configuration (plugins, custom utilities, design tokens, dark mode variant) lives in `app/globals.css` via `@import "tailwindcss"` and `@plugin` directives.

## Formatting

Biome handles formatting and general JavaScript, TypeScript, and React Hooks linting. A slim ESLint config retains `@next/eslint-plugin-next` and `eslint-plugin-tailwind-canonical-classes`, which canonicalizes classes through Tailwind v4 (it is not a class-order formatter). Babel parses TypeScript for these ESLint rules without a TypeScript peer dependency. Run `npm run lint:fix` to auto-correct or `npm run format` for formatting only.

Existing array-key and accessibility findings in the privacy policy, QuickStart, and NavMenu have file-scoped warning overrides in `biome.json`; new files retain recommended severities. Generated outputs and lockfiles are excluded from Biome checks. Development tooling requires Node 22.18+ or 24.11+ (Babel 8 for ESLint 10).

## Playwright Visual Tests

Tests run against the live dev server with a single worker. Pixel tolerance is 0.2% — do not change parallelism or tolerance defaults. Update snapshots only with `npm run test:visual:update` and only after intentional visual changes.

## Branch & PR Conventions

Use conventional prefixes: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`. All changes go through a PR — no direct pushes to `main`.

Plan/design docs (`docs/plans/*.md`) for a feature must be committed together with that feature's implementation — or earlier, before implementation starts. Never leave them as uncommitted stragglers once the feature ships.

CI can be skipped for trivial changes by adding `[skip-ci]` to the commit message, PR title, or PR body.

## CI

GitHub Actions runs lint, build, and vitest on Node 24 on every push and PR to `main`. Visual regression tests are manual-only (not in CI).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. `MAILERLITE_API_KEY` is required by `app/api/subscribe/route.ts` (newsletter subscription form).

## Product claims

Threadbase has no hosted service: the app talks only to streamers the user runs. Several pieces of site copy state that as fact, so before writing or changing anything about relays, hosted backends, self-hosting, or sub-processors, read [docs/no-hosted-service.md](docs/no-hosted-service.md) — it lists every claim that a hosted service would falsify, and says not to hedge them in advance.

## Issue status updates

Any change traceable to an existing issue ends with a status update on that issue — code, docs, tests, config, a revert, or a deletion all count. The issue is the record; a commit message, a PR body, or a chat reply is not a substitute.

- **Completed** — close the issue, with a comment naming what landed and where (PR or commit).
- **Partly completed** — leave it open and comment with what is done, what remains, and anything the remainder now depends on.
- **Not done** — leave it open and comment with why: blocked, superseded, out of scope, or a precondition that has to change first.

Never close an issue that was not actually finished, and never leave finished work with the issue still open. If one change resolves several issues, update each of them.
