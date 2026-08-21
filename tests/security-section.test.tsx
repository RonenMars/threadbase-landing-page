import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecuritySection } from "@/components/SecuritySection";
import { renderWithIntl } from "@/tests/test-utils";

describe("SecuritySection", () => {
  it("states the verified session-relay boundary without claiming E2EE", () => {
    renderWithIntl(<SecuritySection />);

    expect(
      screen.getByRole("heading", { name: /no threadbase session relay/i }),
    ).toBeInTheDocument();
    expect(document.body.textContent).toContain(
      "Threadbase does not relay your coding-agent session through a Threadbase-hosted session backend.",
    );
    expect(document.body.textContent).not.toMatch(/end-to-end encrypted/i);
  });
});
