import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SupportPage from "@/app/[locale]/support/page";
import { renderWithIntl } from "@/tests/test-utils";

describe("Support page", () => {
  it("renders support contact information and request guidance", async () => {
    const page = await SupportPage({
      params: Promise.resolve({ locale: "en" }),
    });
    renderWithIntl(page);

    expect(screen.getByRole("heading", { level: 1, name: /how can we help/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "support@threadbase.sh" })[0]).toHaveAttribute(
      "href",
      "mailto:support@threadbase.sh",
    );
    expect(screen.getByText(/questions about installing or pairing/i)).toBeInTheDocument();
    expect(screen.getByText(/bug reports, crashes, notification problems/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /privacy policy/i })[0]).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
});
