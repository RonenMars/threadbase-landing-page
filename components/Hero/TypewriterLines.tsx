"use client";

import { useEffect, useState } from "react";

// ── Typewriter hook — types `text` one character at a time ─────────────────
export function useTypewriter(text: string, charDelayMs = 20, startDelayMs = 0): string {
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

// ── TypewriterLines — types an array of strings sequentially ───────────────
export function TypewriterLines({
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
