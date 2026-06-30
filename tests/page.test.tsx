import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the new hero headline", () => {
    render(<Home />);
    expect(document.body.textContent).toContain("Your terminal.");
    expect(document.body.textContent).toContain("In your pocket.");
    expect(document.body.textContent).toContain("Live.");
  });

  it("renders the new section narrative in order: problem → features → honest cons → how it works → quick start", () => {
    render(<Home />);
    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent ?? "");

    const problemIdx = headings.findIndex((h) => /trapped in your laptop/i.test(h));
    const featuresIdx = headings.findIndex((h) => /phone-shaped tools/i.test(h));
    const honestIdx = headings.findIndex((h) => /before you install/i.test(h));
    const howIdx = headings.findIndex((h) => /forever paired/i.test(h));
    const quickIdx = headings.findIndex((h) => /under a minute/i.test(h));

    expect(problemIdx).toBeGreaterThanOrEqual(0);
    expect(featuresIdx).toBeGreaterThan(problemIdx);
    expect(honestIdx).toBeGreaterThan(featuresIdx);
    expect(howIdx).toBeGreaterThan(honestIdx);
    expect(quickIdx).toBeGreaterThan(howIdx);
  });

  it("does not render any testimonial pull-quote (removed until we have real ones)", () => {
    render(<Home />);
    expect(
      screen.queryByText(/redirected a 20-minute test run/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Ronen Mars, builder/i)).not.toBeInTheDocument();
  });

  it("renders the brew install command in the quick start", () => {
    render(<Home />);
    expect(screen.getAllByText(/brew install tb-streamer/).length).toBeGreaterThan(0);
  });

  it("does NOT render any of the old removed sections", () => {
    render(<Home />);
    // No platform picker
    expect(screen.queryByText(/choose your environment/i)).not.toBeInTheDocument();
    // No screenshots section
    expect(screen.queryByText(/conversation browser/i)).not.toBeInTheDocument();
    // No "AI Session Browser" eyebrow
    expect(screen.queryByText(/^AI Session Browser$/i)).not.toBeInTheDocument();
  });
});
