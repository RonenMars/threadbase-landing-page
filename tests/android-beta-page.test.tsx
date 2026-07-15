import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AndroidBetaPage from "@/app/android-beta/page";
import { ANDROID_BETA } from "@/lib/content";

describe("AndroidBetaPage", () => {
  it("renders the page heading and eyebrow", () => {
    render(<AndroidBetaPage />);
    expect(screen.getByRole("heading", { name: /android beta/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(ANDROID_BETA.eyebrow)).toBeInTheDocument();
  });

  it("renders all four ordered steps in order", () => {
    render(<AndroidBetaPage />);
    const stepHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(stepHeadings).toHaveLength(ANDROID_BETA.steps.length);
    ANDROID_BETA.steps.forEach((step, idx) => {
      expect(stepHeadings[idx]).toHaveTextContent(step.title);
    });
  });

  it("links to the Google Group join URL with the canonical href", () => {
    render(<AndroidBetaPage />);
    const groupLink = screen.getByRole("link", { name: /join the testers group/i });
    expect(groupLink).toHaveAttribute("href", ANDROID_BETA.groupUrl);
    expect(groupLink).toHaveAttribute("target", "_blank");
    expect(groupLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("links to the Play Store opt-in URL", () => {
    render(<AndroidBetaPage />);
    const playLink = screen.getByRole("link", { name: /open in google play/i });
    expect(playLink).toHaveAttribute("href", ANDROID_BETA.playUrl);
  });

  it("describes the App not available fallback condition", () => {
    render(<AndroidBetaPage />);
    expect(screen.getByText(/app not available/i)).toBeInTheDocument();
  });
});
