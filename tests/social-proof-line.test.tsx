import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialProofLine } from "@/components/SocialProofLine";
import { renderWithIntl } from "@/tests/test-utils";

describe("SocialProofLine", () => {
  it("renders the open-source line", () => {
    renderWithIntl(<SocialProofLine />);
    expect(
      screen.getByText(/open source, mit, built by a developer who runs it every day/i),
    ).toBeInTheDocument();
  });
});
