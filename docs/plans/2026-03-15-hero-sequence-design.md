# Hero Sequence Design

**Date:** 2026-03-15

## Goal

Replace the static hero shell content with a single universal staged sequence that shows the product transforming raw Claude Code JSONL into a searchable, actionable browser.

## Approved Direction

- Keep the existing hero chrome and CTA buttons
- Do not let the CTA buttons control the animation state
- Run one narrative sequence for everyone
- End in a stable final browser state rather than looping forever

## Sequence

1. **Raw JSONL**
   - Sidebar: parsing-oriented labels such as `Sessions`, `Tool Calls`, `Diffs`, `Bash`, `Files`
   - Main pane: dense escaped JSONL and unreadable session data

2. **Decoded Structure**
   - Sidebar remains parse-oriented
   - Main pane resolves into readable conversation and tool cards

3. **Command Palette**
   - Sidebar changes to action-oriented labels such as `Search`, `Filter by project`, `Open result`, `Export`, `Resume`
   - Main pane shows a command-palette style overlay targeting a specific recovery query

4. **Deep View**
   - Sidebar stays action-oriented
   - Main pane lands in a full conversation browser with one highlighted result

## Implementation Notes

- All new user-facing copy belongs in `lib/content.ts`
- The sequence should advance automatically with timed transitions and then stop on the final state
- The hero component remains a client component
- Motion should stay polished but restrained and compatible with static export
