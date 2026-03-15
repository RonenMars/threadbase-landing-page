# Hero TimeAnimator-Inspired Animation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero shell's static stage-swap animation with layered, time-delta-driven animations where each element has its own independent timeline — inspired by Android's TimeAnimator pattern.

**Architecture:** All changes are confined to `components/Hero.tsx`. Two new primitive hooks/components (`useTypewriter`, `TypewriterLines`) drive character-by-character text reveals. An animated framer-motion `scaleX` bar replaces the static top-of-panel gradient line to show stage progress. `CommandPaletteStage` gates result visibility on query completion. Exit animations become more dramatic with `scale` + `y`.

**Tech Stack:** React hooks (`useState`, `useEffect`), `window.setInterval`/`setTimeout` (TimeAnimator equivalent), framer-motion (`motion`, `AnimatePresence`, `Variants`)

---

## Chunk 1: Typewriter Primitives

### Task 1: Add `useTypewriter` hook

**Files:**
- Modify: `components/Hero.tsx` (add after imports, before `panelVariants`)

- [ ] **Step 1: Add `useTypewriter` hook**

Insert after the import block (line 7), before the `panelVariants` const:

```tsx
// ── Typewriter hook — types `text` one character at a time ─────────────────
function useTypewriter(text: string, charDelayMs = 20, startDelayMs = 0): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!text) return;
    let i = 0;
    let intervalId: number | undefined;
    const delayId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(intervalId);
      }, charDelayMs);
    }, startDelayMs);
    return () => {
      clearTimeout(delayId);
      clearInterval(intervalId);
    };
  }, [text, charDelayMs, startDelayMs]);

  return text.slice(0, count);
}
```

- [ ] **Step 2: Add `TypewriterLines` component**

Insert directly after `useTypewriter`, before `panelVariants`:

```tsx
// ── TypewriterLines — types an array of strings sequentially ───────────────
function TypewriterLines({
  lines,
  charDelayMs = 12,
  lineGapMs = 120,
}: {
  lines: string[];
  charDelayMs?: number;
  lineGapMs?: number;
}): React.JSX.Element {
  const [state, setState] = useState({ lineIndex: 0, charCount: 0 });

  useEffect(() => {
    let lineIndex = 0;
    let charCount = 0;
    let intervalId: number | undefined;
    let timeoutId: number | undefined;
    setState({ lineIndex: 0, charCount: 0 });

    function typeCurrentLine(): void {
      if (lineIndex >= lines.length) return;
      const line = lines[lineIndex];
      charCount = 0;
      intervalId = window.setInterval(() => {
        charCount += 1;
        setState({ lineIndex, charCount });
        if (charCount >= line.length) {
          clearInterval(intervalId);
          if (lineIndex < lines.length - 1) {
            timeoutId = window.setTimeout(() => {
              lineIndex += 1;
              typeCurrentLine();
            }, lineGapMs);
          }
        }
      }, charDelayMs);
    }

    typeCurrentLine();
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [lines, charDelayMs, lineGapMs]);

  const { lineIndex, charCount } = state;
  return (
    <>
      {lines.slice(0, lineIndex).map((line, i) => (
        <p className={i === 2 ? "text-accent-strong" : ""} key={i}>
          {line}
        </p>
      ))}
      {lineIndex < lines.length && (
        <p className={lineIndex === 2 ? "text-accent-strong" : ""}>
          {lines[lineIndex].slice(0, charCount)}
          <span className="animate-pulse opacity-60">▋</span>
        </p>
      )}
    </>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/ronen/Desktop/dev/personal/threadbase/threadbase-landing-codex && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add useTypewriter hook and TypewriterLines component"
```

---

## Chunk 2: Stage Body Rewrites

### Task 2: Rewire `RawStage` to use `TypewriterLines`

**Files:**
- Modify: `components/Hero.tsx` — `RawStage` function (lines 130–152)

- [ ] **Step 1: Replace `RawStage` body**

Replace the entire `RawStage` function:

```tsx
function RawStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="rounded-3xl border border-white/6 bg-black/28 p-4">
      <div className="mb-4 flex items-center justify-between border-b border-white/6 pb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span>local session file</span>
        <span>jsonl</span>
      </div>
      <div className="space-y-3 font-mono leading-7 text-secondary">
        <TypewriterLines lines={stage.rawLines ?? []} charDelayMs={12} lineGapMs={120} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

### Task 3: Rewire `CommandPaletteStage` to type the query then gate results

**Files:**
- Modify: `components/Hero.tsx` — `CommandPaletteStage` function (lines 180–234)

- [ ] **Step 1: Replace `CommandPaletteStage`**

Replace the entire `CommandPaletteStage` function:

```tsx
function CommandPaletteStage({
  stage,
}: {
  stage: HeroShellStage;
}): React.JSX.Element {
  const query = stage.paletteQuery ?? "";
  // Start typing 600 ms after mount so the palette overlay finishes animating in
  const typedQuery = useTypewriter(query, 45, 600);
  const queryDone = typedQuery.length >= query.length;

  return (
    <div className="relative flex min-h-62.5 items-end rounded-3xl border border-white/6 bg-[linear-gradient(180deg,rgba(8,13,22,0.98),rgba(9,14,24,0.92))] p-5">
      <div className="grid w-full gap-4 opacity-35 md:grid-cols-3">
        <div className="rounded-5xl border border-white/6 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Conversation
          </p>
          <p className="mt-4 font-medium text-primary">
            Auth refresh loop fixed
          </p>
          <p className="mt-3 leading-7 text-secondary">
            Retry logic isolated and token renewal extracted into a helper.
          </p>
        </div>
        <div className="rounded-5xl border border-white/6 bg-white/3 p-4" />
        <div className="rounded-5xl border border-white/6 bg-white/3 p-4" />
      </div>

      <div className="absolute inset-x-8 top-8 rounded-3xl border border-border-strong bg-[linear-gradient(180deg,rgba(16,28,44,0.98),rgba(11,19,31,0.96))] p-5 shadow-[0_20px_60px_rgba(1,6,14,0.55)]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3 font-mono text-primary"
          initial={{ opacity: 0, y: 16 }}
          transition={itemTransition(0)}
        >
          &gt; {typedQuery}
          {!queryDone && <span className="animate-pulse opacity-70">▋</span>}
        </motion.div>

        <AnimatePresence>
          {queryDone && (
            <motion.div
              animate={{ opacity: 1 }}
              className="mt-4 space-y-3"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Results appear after queryDone, so stagger starts fresh from index 0 — no +1 offset needed */}
              {stage.paletteOptions?.map((option, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border px-4 py-3 ${
                    index === 0
                      ? "border-accent/40 bg-accent/10"
                      : "border-white/6 bg-white/3"
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  key={option.label}
                  transition={itemTransition(index)}
                >
                  <p className="font-medium text-primary">{option.label}</p>
                  <p className="mt-1 text-muted">{option.meta}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: typewriter JSONL lines and gated command palette results"
```

---

## Chunk 3: Panel Frame Polish

### Task 4: Animate the stage progress bar

**Files:**
- Modify: `components/Hero.tsx` — inside `Hero` JSX, the static `h-px` div (line 476)

- [ ] **Step 1: Replace the static gradient line with an animated progress sweep**

Replace:

```tsx
<div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,179,255,0.8),transparent)]" />
```

With:
```tsx
<motion.div
  animate={{ scaleX: 1, opacity: 0.55 }}
  className="absolute inset-x-0 top-0 h-px origin-left bg-[linear-gradient(90deg,transparent_10%,rgba(99,179,255,0.9)_50%,transparent_90%)]"
  initial={{ scaleX: 0, opacity: 1 }}
  transition={{
    duration: (activeStage.durationMs ?? 6000) / 1000,
    ease: "linear",
  }}
/>
```

The `key` is not needed here because the parent panel `motion.div` already has `key={activeStage.id}` — the whole panel (and its children) remounts on stage change.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

### Task 5: Improve `panelVariants` exit animation

**Files:**
- Modify: `components/Hero.tsx` — `panelVariants` (lines 14–26)

- [ ] **Step 1: Update exit variant**

Replace:
```tsx
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
```

With:
```tsx
  exit: {
    opacity: 0,
    y: -28,
    scale: 0.97,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  },
```

### Task 6: Add blinking cursor after shell title

**Files:**
- Modify: `components/Hero.tsx` — shell title bar in `Hero` JSX (line 447)

- [ ] **Step 1: Add cursor span after shell title**

Replace:
```tsx
              <span className="ml-2">{hero.shellTitle}</span>
```

With:
```tsx
              <span className="ml-2">{hero.shellTitle}</span>
              <span className="ml-1 animate-pulse opacity-50">▋</span>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 3: Smoke-test in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Stage 1: JSONL lines type out one by one with cursor
- Stage 3: query types itself, then results cascade in
- Top of panel: gradient line sweeps left-to-right as stage runs
- Shell title bar shows blinking cursor at end
- Stage transitions: exit feels more dramatic (scale + y)

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: stage progress bar, dramatic exit, blinking shell cursor"
```
