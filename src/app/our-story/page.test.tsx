import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("Our story page renders", async () => {
  render(await Page());
  expect(screen.findByText("Our Story!")).toBeDefined();
});
