# Threadbase Landing Design

**Date:** 2026-03-14

## Goal

Build a static Next.js marketing landing page for Claude Code History Browser in the current workspace, using the content and section structure from `nextjs-landing-page-prompt.md`, with a more distinctive "Signal Console" visual direction.

## Approved Direction

The page keeps the prompt's content model and section order, but the visuals shift from orange-led to a cooler, more technical system:

- Near-black and deep navy surfaces
- Steel blue and cyan as the primary interface accents
- Orange as a secondary accent for selected highlights and metadata
- High-tech but restrained atmosphere: grid overlays, glow, panel chrome, terminal framing

## Page Shell

- Full-page dark shell with subtle depth from gradients, grid lines, low-contrast noise, and radial glows
- Consistent centered container with large vertical spacing
- Strong typographic hierarchy with a precise, professional feel
- Screenshot placeholders framed like real app surfaces so they still communicate product value before real images exist

## Sections

### Hero

- Most cinematic section on the page
- Large centered headline and subheadline
- Three CTA buttons
- Large screenshot placeholder with framed console-like chrome

### Problem Section

- Three-card diagnostic grid
- Slightly denser and more analytical in tone
- Visual rhythm shifts from hero spectacle to product pain clarity

### Features Grid

- Most interactive grid on the page
- Hover lift, border brightening, focused glow, and crisp icon treatment
- Cards feel technical, not playful

### Platform Section

This section is intentionally simplified from the original tab-heavy prompt.

- Replace the complex tabbed details with three large install-choice cards
- Each card contains icon, platform name, short descriptor, and a single CTA
- Visual reference: clean marketplace/install selector
- Detailed commands and install context move to `QuickStart`

### Screenshots

- Three alternating left-right product story blocks
- Text and placeholder surface paired like product walkthrough slides
- Framed to read like real product views even before screenshots are added

### Honest Cons

- Narrower, quieter, and deliberately less dramatic
- Honest and credible rather than apologetic
- Reduced visual intensity so the section feels trustworthy

### Quick Start

- Three command blocks, one per platform
- Terminal-grade presentation with strong monospace styling
- Carries detailed install commands so the platform chooser can stay clean

### Footer

- Minimal, grounded, and product-focused
- Legal and link information without visual clutter

## Motion Strategy

- Framer Motion handles section reveal, sequencing, and in-view choreography
- `tailwindcss-motion` adds refined interaction polish for hover, focus, and small state changes
- Motion stays controlled: fast, crisp, technical, and export-safe
- Hover quality matters more than dramatic entrance effects after the hero

## Content Architecture

- `lib/content.ts` is the only source of user-facing copy
- `app/page.tsx` imports typed content and passes it into section components
- Section components remain presentational and receive typed props only
- The simplified platform section contains concise card content while `QuickStart` carries command detail

## Verification Principles

- Static export compatibility is preserved
- No `any` types
- No hardcoded user-facing copy in JSX
- Accessibility and keyboard navigation remain first-class requirements
- Final verification includes build, lint, typecheck, grep checks, and manual dev-server inspection if environment permits
