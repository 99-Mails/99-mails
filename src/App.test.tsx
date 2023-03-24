import { vi, it, expect } from "vitest";
import {
  screen,
  userEvent,
  renderWithContext,
  waitForElementToBeRemoved,
} from "@/tests/test-utils";
import App from "./App";
import type { IStoreContext } from "@/services/store/store";

let storeProps: IStoreContext;

beforeEach(() => {
  storeProps = {
    dispatch: vi.fn,
    state: {
      tempEmails: {
        sessionId: "123123",
      },
    },
  };
});

// TODO: fix this test
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
