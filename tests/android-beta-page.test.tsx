import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AndroidBetaPage from "@/app/[locale]/android-beta/page";
import { ANDROID_BETA_LINKS } from "@/lib/content";
import enMessages from "@/messages/en.json";
import { renderWithIntl } from "@/tests/test-utils";

describe("AndroidBetaPage", () => {
  it("renders the page heading and eyebrow", () => {
    renderWithIntl(<AndroidBetaPage />);
    expect(screen.getByRole("heading", { name: /android beta/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(enMessages.pages.androidBeta.eyebrow)).toBeInTheDocument();
  });

  it("renders all four ordered steps in order", () => {
    renderWithIntl(<AndroidBetaPage />);
    const stepHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(stepHeadings).toHaveLength(enMessages.pages.androidBeta.steps.length);
    enMessages.pages.androidBeta.steps.forEach((step, idx) => {
      expect(stepHeadings[idx]).toHaveTextContent(step.title);
    });
  });

  it("links to the Google Group join URL with the canonical href", () => {
    renderWithIntl(<AndroidBetaPage />);
    const groupLink = screen.getByRole("link", { name: /join the testers group/i });
    expect(groupLink).toHaveAttribute("href", ANDROID_BETA_LINKS.groupUrl);
    expect(groupLink).toHaveAttribute("target", "_blank");
    expect(groupLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("links to the Play Store opt-in URL", () => {
    renderWithIntl(<AndroidBetaPage />);
    const playLink = screen.getByRole("link", { name: /open in google play/i });
    expect(playLink).toHaveAttribute("href", ANDROID_BETA_LINKS.playUrl);
  });

  it("describes the App not available fallback condition", () => {
    renderWithIntl(<AndroidBetaPage />);
    expect(screen.getByText(/app not available/i)).toBeInTheDocument();
  });
});
