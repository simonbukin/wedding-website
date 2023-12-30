import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("Travel page renders", () => {
  render(<Page />);
  expect(screen.findByText("Travel!")).toBeDefined();
});
