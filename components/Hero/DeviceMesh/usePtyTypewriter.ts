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

      const jitter = (Math.random() - 0.5) * 2 * PTY_CADENCE_MS.jitter;
      const delay = PTY_CADENCE_MS.base + jitter;
      window.setTimeout(tick, delay);
    }

    tick();

    return () => {
      cancelled = true;
    };
  }, [lines, enabled]);

  return output;
}
