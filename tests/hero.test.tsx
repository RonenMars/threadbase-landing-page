import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Hero } from "@/components/Hero";
import { renderWithIntl } from "@/tests/test-utils";

const originalUserAgent = navigator.userAgent;
const originalMaxTouchPoints = navigator.maxTouchPoints;

afterEach(() => {
  Object.defineProperty(navigator, "userAgent", {
    configurable: true,
    value: originalUserAgent,
  });
  Object.defineProperty(navigator, "maxTouchPoints", {
    configurable: true,
    value: originalMaxTouchPoints,
  });
});

describe("Hero", () => {
  it("renders the continuity-first headline and supporting copy", () => {
    renderWithIntl(<Hero />);
    const root = screen.getByRole("banner") ?? document.body;
    expect(root.textContent).toContain(
      "Your coding agents don’t stop when you leave your desk.",
    );
    expect(root.textContent).toContain(
      "Watch, resume, approve, search, and respond to Claude Code and Codex sessions from your phone",
    );
  });

  it("renders the eyebrow", () => {
    renderWithIntl(<Hero />);
    expect(
      screen.getByText(/claude code \+ codex cli, away from your desk/i),
    ).toBeInTheDocument();
  });

  it("renders 3 platform badges", () => {
    renderWithIntl(<Hero />);
    expect(screen.getByText(/iOS · TestFlight beta/)).toBeInTheDocument();
    expect(screen.getByText(/Android · closed testing/)).toBeInTheDocument();
    expect(screen.getByText(/macOS · Linux · Windows streamer/)).toBeInTheDocument();
  });

  it("renders both CTAs", () => {
    renderWithIntl(<Hero />);
    const betaCta = screen.getByRole("button", { name: /join the beta/i });
    expect(betaCta).toHaveAttribute("href", "https://threadbase.sh/betas");
    expect(screen.getByText(/brew install tb-streamer/)).toBeInTheDocument();
  });

  it.each([
    {
      platform: "Android",
      userAgent: "Mozilla/5.0 (Linux; Android 15; Pixel 9)",
      maxTouchPoints: 5,
      href: "https://threadbase.sh/android-beta",
    },
    {
      platform: "iPhone",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)",
      maxTouchPoints: 5,
      href: "https://testflight.apple.com/join/FqdM3mFK",
    },
    {
      platform: "iPad desktop UA",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      maxTouchPoints: 5,
      href: "https://testflight.apple.com/join/FqdM3mFK",
    },
  ])("routes the beta CTA for $platform", async ({ userAgent, maxTouchPoints, href }) => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: userAgent,
    });
    Object.defineProperty(navigator, "maxTouchPoints", {
      configurable: true,
      value: maxTouchPoints,
    });

    renderWithIntl(<Hero />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /join the beta/i })).toHaveAttribute(
        "href",
        href,
      );
    });
  });

  it("does NOT render the old workflow steps or shell stages", () => {
    renderWithIntl(<Hero />);
    expect(screen.queryByText(/Decode JSONL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Command Palette/i)).not.toBeInTheDocument();
  });

  it("copies the brew install command to the clipboard when the outline CTA is clicked", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    renderWithIntl(<Hero />);
    const copyBtn = screen.getByRole("button", {
      name: /^copy: brew install tb-streamer$/i,
    });
    fireEvent.click(copyBtn);

    expect(writeText).toHaveBeenCalledWith("brew install tb-streamer");
    // After click, the aria-label flips to indicate the copied state.
    expect(
      screen.getByRole("button", { name: /copied to clipboard/i }),
    ).toBeInTheDocument();
  });
});
