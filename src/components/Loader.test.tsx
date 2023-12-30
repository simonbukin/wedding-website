import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("Loader renders", () => {
  render(<Loader />);
  expect(screen.findByText("Loading...")).toBeDefined();
});

test("Loader renders with custom text", () => {
  render(<Loader text="Custom text" />);
  expect(screen.findByText("Custom text")).toBeDefined();
});
