import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ToolTipWithMobileHover } from "./ToolTipWithMobileHover";

describe("ToolTipWithMobileHover", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders the tooltip text", () => {
    render(<ToolTipWithMobileHover />);
    expect(screen.getByText("💜")).toBeDefined();
  });

  it("renders the tooltip popup when hovered", async () => {
    render(<ToolTipWithMobileHover />);
    fireEvent.focus(screen.getByText("💜"));
    await waitFor(() => screen.getAllByTestId("tooltip-content"));
    screen.debug();
    const el = document.getElementById("tooltip-content");
    expect(el).toBeDefined();
    expect(el?.textContent).toBe('she said "yeah"');
  });
});
