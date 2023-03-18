import React from "react";
import { vi, it, expect } from "vitest";
import {
  renderWithContext,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "./tests/test-utils";
import App from "./App";
import type { IStoreContext } from "./services/store";

let storeProps: IStoreContext;

beforeEach(() => {
  storeProps = {
    sessionId: "12345678",
    cleanState: vi.fn(),
    setSessionId: vi.fn(),
  };
});

it.skip("should get a random address when clicks on reset session button", async () => {
  const user = userEvent.setup();

  renderWithContext(<App />, { storeProps });

  expect(screen.getByTestId("header")).toBeDefined();

  await waitForElementToBeRemoved(() => screen.queryAllByText("Loading..."));

  const resetSession = screen.getByTestId("reset-session-btn");
  expect(resetSession).toBeDefined();

  await user.click(resetSession);

  // expect(screen.findByTestId("address-list"))

  // await waitForElementToBeRemoved
  // posts.forEach((post) => {
  //   expect(
  //     screen.getByRole("heading", { name: post.title, level: 2 })
  //   ).toBeDefined();
  //   expect(screen.getByText(post.body)).toBeDefined();
  // });
});
