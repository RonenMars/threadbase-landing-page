import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Faq } from "@/components/Faq";
import { renderWithIntl } from "@/tests/test-utils";

describe("Faq", () => {
  it("renders six questions and a support link", () => {
    renderWithIntl(<Faq />);
    expect(
      screen.getByRole("heading", { name: /frequently asked questions/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/does it work with codex\?/i)).toBeInTheDocument();
    expect(screen.getByText(/do i have to open ports\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/what if my phone is offline when the agent asks\?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/which platforms run the streamer\?/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/why is sentry in the app\?/i)).toBeInTheDocument();
    expect(screen.getByText(/what does it cost\?/i)).toBeInTheDocument();
    const supportLink = screen.getByRole("link", { name: /^support$/i });
    expect(supportLink).toHaveAttribute("href", "/support");
  });
});
