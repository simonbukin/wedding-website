import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("Our story page renders", () => {
  render(<Page />);
  expect(screen.findByText("Our Story!")).toBeDefined();
});
