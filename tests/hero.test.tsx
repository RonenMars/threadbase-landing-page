import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Hero } from "@/components/Hero";
import { HERO } from "@/lib/content";

function expectWorkflowStepActive(label: string): void {
  const matchingLabels = screen.getAllByText(label);
  const hasActiveMatch = matchingLabels.some(
    (element) => element.closest('[aria-current="step"]') !== null,
  );

  expect(hasActiveMatch).toBe(true);
}

afterEach(() => {
  vi.useRealTimers();
});

describe("Hero", () => {
  it("moves through a slower continuous recovery workflow", () => {
    vi.useFakeTimers();

    render(<Hero hero={HERO} />);

    expect(screen.getByText("session_014.jsonl")).toBeInTheDocument();
    expectWorkflowStepActive("Decode JSONL");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("session_014.jsonl")).toBeInTheDocument();
    expectWorkflowStepActive("Decode JSONL");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText("Same history. Finally readable.")).toBeInTheDocument();
    expectWorkflowStepActive("Inspect structure");

    act(() => {
      vi.advanceTimersByTime(2400);
    });

    expect(screen.getByText("Command Palette")).toBeInTheDocument();
    expectWorkflowStepActive("Search sessions");

    act(() => {
      vi.advanceTimersByTime(2400);
    });

    expectWorkflowStepActive("Resume thread");
    expect(screen.getByText("Ready to resume")).toBeInTheDocument();
    expect(screen.getByText("claude resume session_014")).toBeInTheDocument();
    expect(screen.getByText("Recovered auth fix")).toBeInTheDocument();
  });
});
