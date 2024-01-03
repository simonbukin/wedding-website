import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("Travel page renders", async () => {
  render(await Page());
  expect(await screen.findByText("Travel!")).toBeDefined();
});
