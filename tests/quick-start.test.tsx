import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { QuickStart } from "@/components/QuickStart";
import { QUICK_START, QUICK_START_SECTION } from "@/lib/content";

describe("QuickStart", () => {
  it("shows desktop tab content by default", () => {
    render(
      <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform={null} />
    );
    expect(screen.getByText("pnpm run dev")).toBeInTheDocument();
  });

  it("switches tab when selectedPlatform changes", () => {
    const { rerender } = render(
      <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform={null} />
    );
    rerender(
      <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform="cli" />
    );
    expect(screen.getByText("cch browse")).toBeInTheDocument();
  });

  it("renders all 4 tab labels", () => {
    render(
      <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform={null} />
    );
    expect(screen.getByRole("button", { name: "Desktop App" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "VS Code Extension" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "IntelliJ Plugin" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CLI (cch)" })).toBeInTheDocument();
  });
});
