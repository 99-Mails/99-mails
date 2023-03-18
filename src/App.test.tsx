import { it, expect } from "vitest";
import {
  renderWithContext,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "./tests/test-utils";
import App from "./App";

it.skip("should get a random address when renders", async () => {
  renderWithContext(<App />, { storeProps: {} });

  expect(screen.getByTestId("header")).toBeDefined();

  // userEvent.click(screen.getByRole("button", { name: "Fetch Posts" }));

  // await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));

  // posts.forEach((post) => {
  //   expect(
  //     screen.getByRole("heading", { name: post.title, level: 2 })
  //   ).toBeDefined();
  //   expect(screen.getByText(post.body)).toBeDefined();
  // });
});
