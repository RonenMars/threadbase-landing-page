"use client";

import { useEffect, useState } from "react";
import { PTY_CADENCE_MS } from "./sceneTimeline";

/**
 * Types out an array of lines character-by-character with cadence jitter.
 * Returns the currently-revealed text (lines joined with newlines).
 * Pass `enabled = false` to halt typing without resetting.
 */
export function usePtyTypewriter(lines: readonly string[], enabled: boolean): string {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let timer = 0;
    let charIndex = 0;
    let lineIndex = 0;
    const buffer: string[] = [];

    function tick(): void {
      if (cancelled) return;
      if (lineIndex >= lines.length) return;

      const currentLine = lines[lineIndex];
      if (charIndex < currentLine.length) {
        buffer[lineIndex] = (buffer[lineIndex] ?? "") + currentLine[charIndex];
        charIndex++;
      } else {
        buffer[lineIndex] = currentLine;
        lineIndex++;
        charIndex = 0;
      }

      setOutput(buffer.join("\n"));

      schedule();
    }

    function schedule(): void {
      const jitter = (Math.random() - 0.5) * 2 * PTY_CADENCE_MS.jitter;
      const delay = PTY_CADENCE_MS.base + jitter;
      timer = window.setTimeout(tick, delay);
    }

    // First tick is scheduled rather than called inline: the buffer rebuilds from
    // empty on every effect re-run, so a synchronous setOutput would flash the
    // previous run's full text against it.
    schedule();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [lines, enabled]);

  return output;
}
