import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RoadmapTeaser } from "@/components/RoadmapTeaser";
import { ROADMAP_MILESTONE_CONFIG } from "@/lib/content";
import enTranslations from "@/locales/en.json";
import { renderWithIntl } from "@/tests/test-utils";

describe("RoadmapTeaser", () => {
  it("renders all milestone titles", () => {
    renderWithIntl(<RoadmapTeaser />);
    for (const milestone of enTranslations.home.roadmap.milestones) {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
    }
  });

  it("renders the section heading", () => {
    renderWithIntl(<RoadmapTeaser />);
    expect(
      screen.getByRole("heading", {
        name: enTranslations.home.roadmap.section.heading,
      }),
    ).toBeInTheDocument();
  });

  it("renders the newsletter form", () => {
    renderWithIntl(<RoadmapTeaser />);
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
  });

  it("shows a validation error when submitting without consent", async () => {
    const user = userEvent.setup();
    renderWithIntl(<RoadmapTeaser />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/check the box to subscribe/i)).toBeInTheDocument();
  });

  it("shows a validation error for an invalid email", async () => {
    const user = userEvent.setup();
    renderWithIntl(<RoadmapTeaser />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "not-an-email");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it("shows success message after newsletter submit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true } as Response),
    );
    const user = userEvent.setup();
    renderWithIntl(<RoadmapTeaser />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/check your inbox/i)).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("shows error message when subscribe request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network error")),
    );
    const user = userEvent.setup();
    renderWithIntl(<RoadmapTeaser />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("renders status icons as SVG (Phosphor)", () => {
    const { container } = renderWithIntl(<RoadmapTeaser />);
    // Each milestone gets one status icon SVG on its node.
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(ROADMAP_MILESTONE_CONFIG.length);
  });

  it("does NOT render emoji status glyphs", () => {
    const { container } = renderWithIntl(<RoadmapTeaser />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});
