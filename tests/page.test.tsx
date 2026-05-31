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

  it("renders the new section narrative in order: problem → how it works → features → pull-quote → honest cons → roadmap → quick start", () => {
    render(<Home />);
    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent ?? "");

    const problemIdx = headings.findIndex((h) => /trapped in your laptop/i.test(h));
    const howIdx = headings.findIndex((h) => /forever paired/i.test(h));
    const featuresIdx = headings.findIndex((h) => /phone-shaped tools/i.test(h));
    const honestIdx = headings.findIndex((h) => /before you install/i.test(h));
    const roadmapIdx = headings.findIndex((h) => /eight things we're building/i.test(h));
    const quickIdx = headings.findIndex((h) => /under a minute/i.test(h));

    expect(problemIdx).toBeGreaterThanOrEqual(0);
    expect(howIdx).toBeGreaterThan(problemIdx);
    expect(featuresIdx).toBeGreaterThan(howIdx);
    expect(honestIdx).toBeGreaterThan(featuresIdx);
    expect(roadmapIdx).toBeGreaterThan(honestIdx);
    expect(quickIdx).toBeGreaterThan(roadmapIdx);
  });

  it("renders the pull-quote (testimonial) between features and honest cons", () => {
    render(<Home />);
    expect(screen.getByText(/redirected a 20-minute test run/i)).toBeInTheDocument();
  });

  it("renders the brew install command in the quick start", () => {
    render(<Home />);
    expect(screen.getAllByText(/brew install threadbase-streamer/).length).toBeGreaterThan(0);
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
