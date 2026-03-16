import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PlatformPicker } from "@/components/PlatformPicker";
import { PLATFORM_SECTION, PLATFORMS } from "@/lib/content";

const noop = () => {};

describe("PlatformPicker", () => {
  it("renders the IDE group label and both sub-buttons", () => {
    render(
      <PlatformPicker
        platforms={PLATFORMS}
        section={PLATFORM_SECTION}
        selected={null}
        onSelect={noop}
      />
    );
    expect(screen.getByText("IDE Extensions")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /VS Code/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /IntelliJ/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Desktop App/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CLI \(cch\)/i })).toBeInTheDocument();
  });

  it("shows prompt text when no platform is selected", () => {
    render(
      <PlatformPicker
        platforms={PLATFORMS}
        section={PLATFORM_SECTION}
        selected={null}
        onSelect={noop}
      />
    );
    expect(screen.getByText(/pick your environment/i)).toBeInTheDocument();
  });

  it("calls onSelect with the platform id when a card is clicked", async () => {
    const user = userEvent.setup();
    const calls: (string | null)[] = [];
    render(
      <PlatformPicker
        platforms={PLATFORMS}
        section={PLATFORM_SECTION}
        selected={null}
        onSelect={(id) => calls.push(id)}
      />
    );
    await user.click(screen.getByRole("button", { name: /Desktop App/i }));
    expect(calls).toEqual(["desktop"]);
  });
});
