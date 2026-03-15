# Hero Animation Refinement Design

**Date:** 2026-03-15

## Goal

Make the hero animation feel like one coherent recovery workflow instead of a fast sequence of unrelated slides.

## Root Cause

- The stage durations are short enough that the shell reads as a slideshow rather than a product workflow.
- The highlighted sidebar item changes between unrelated labels, so the user cannot map the active state to a single narrative.
- The sidebar is hidden on smaller screens, which removes half of the intended animation story.

## Approved Refinement

- Keep the four-stage narrative: raw JSONL, decoded structure, command palette, deep view.
- Replace the stage-local sidebar labels with one persistent workflow:
  - `Decode JSONL`
  - `Inspect structure`
  - `Search sessions`
  - `Resume thread`
- Slow the stage timing so each state can be read before the next transition begins.
- Use softer opacity-driven transitions so the shell feels continuous rather than remounted.
- Show the same workflow steps on mobile as a compact top strip inside the shell.

## Result

The hero should read as:

1. decode the raw file
2. inspect the extracted structure
3. search for the needed session
4. resume the recovered thread
