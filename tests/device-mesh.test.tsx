import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DeviceMesh } from "@/components/Hero/DeviceMesh";

describe("DeviceMesh", () => {
  it("renders without crashing", () => {
    const { container } = render(<DeviceMesh />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("includes at least one Phone outline (viewBox 0 0 80 160)", () => {
    const { container } = render(<DeviceMesh />);
    const svgs = Array.from(container.querySelectorAll("svg"));
    expect(svgs.some((s) => s.getAttribute("viewBox") === "0 0 80 160")).toBe(true);
  });

  it("includes at least one Laptop outline (viewBox 0 0 200 130)", () => {
    const { container } = render(<DeviceMesh />);
    const svgs = Array.from(container.querySelectorAll("svg"));
    expect(svgs.some((s) => s.getAttribute("viewBox") === "0 0 200 130")).toBe(true);
  });
});
