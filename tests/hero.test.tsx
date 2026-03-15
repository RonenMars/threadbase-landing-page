import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Hero } from "@/components/Hero";
import { HERO } from "@/lib/content";

afterEach(() => {
  vi.useRealTimers();
});

describe("Hero", () => {
  it("moves from raw JSONL to a stable deep-view state", () => {
    vi.useFakeTimers();

    render(<Hero hero={HERO} />);

    expect(screen.getByText("session_014.jsonl")).toBeInTheDocument();
    expect(screen.getByText("Tool Calls")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(7000);
    });

    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Recovered auth fix")).toBeInTheDocument();
  });
});
