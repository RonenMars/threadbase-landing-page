import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FinalCta } from "@/components/FinalCta";
import { renderWithIntl } from "@/tests/test-utils";

describe("FinalCta", () => {
  it("keeps the beta CTA and newsletter form", () => {
    renderWithIntl(<FinalCta />);
    expect(screen.getByRole("button", { name: "Join the Beta" })).toHaveAttribute(
      "href",
      "/betas",
    );
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
  });

  it("shows a validation error when submitting without consent", async () => {
    const user = userEvent.setup();
    renderWithIntl(<FinalCta />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/check the box to subscribe/i)).toBeInTheDocument();
  });

  it("shows a validation error for an invalid email", async () => {
    const user = userEvent.setup();
    renderWithIntl(<FinalCta />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "not-an-email");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it("shows the success message after newsletter submit", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));
    const user = userEvent.setup();
    renderWithIntl(<FinalCta />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/check your inbox/i)).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("shows the error message when subscribe fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));
    const user = userEvent.setup();
    renderWithIntl(<FinalCta />);
    await user.type(screen.getByPlaceholderText("you@company.com"), "test@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
