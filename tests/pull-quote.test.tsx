import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PullQuote } from "@/components/PullQuote";
import { PULL_QUOTE } from "@/lib/content";

describe("PullQuote", () => {
  it("renders the quote body and attribution", () => {
    render(<PullQuote content={PULL_QUOTE} />);
    expect(screen.getByText(/redirected a 20-minute test run/)).toBeInTheDocument();
    expect(screen.getByText(/Ronen Mars, builder/)).toBeInTheDocument();
  });

  it("does NOT wrap the quote in a card with a heavy background", () => {
    const { container } = render(<PullQuote content={PULL_QUOTE} />);
    // The component should not render a <div role="article"> or similar card chrome.
    expect(container.querySelector("[role='article']")).toBeNull();
  });
});
