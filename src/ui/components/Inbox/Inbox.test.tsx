import { vi, it } from "vitest";
import { IStoreContext } from "@/services/store";
import {
  renderWithContext,
  screen,
  waitForElementToBeRemoved,
} from "@/tests/test-utils";
import { InboxContainer } from "./Inbox";

let storeProps: IStoreContext;

beforeEach(() => {
  storeProps = {
    dispatch: vi.fn,
    state: {
      tempEmails: {
        sessionId: "111111",
      },
    },
  };
});

it("should render correctly", () => {
  const { asFragment } = renderWithContext(<InboxContainer />, { storeProps });
  expect(asFragment()).toMatchSnapshot();
});

it("should display a text when there are no emails", () => {
  renderWithContext(<InboxContainer />, { storeProps });

  expect(screen.getByTestId("inbox-wrapper")).toBeDefined();
  expect(screen.getByTestId("inbox-wrapper")).toHaveTextContent(
    "No Emails Yet!"
  );
});

it("should show zero count when there are no emails", async () => {
  renderWithContext(<InboxContainer />, { storeProps });

  expect(screen.getByTestId("inbox-emails-count")).toBeDefined();

  await waitForElementToBeRemoved(() => screen.queryAllByText("Loading..."));

  expect(screen.getByTestId("inbox-emails-count")).toHaveTextContent("0");
});

it("should show one when there is an email", async () => {
  storeProps.state.tempEmails.sessionId = "123456";

  renderWithContext(<InboxContainer />, { storeProps });

  expect(screen.getByTestId("inbox-emails-count")).toBeDefined();

  await waitForElementToBeRemoved(() => screen.queryAllByText("Loading..."));

  expect(screen.getByTestId("inbox-emails-count")).toHaveTextContent("1");
});

it("should show the correct subject", () => {
  storeProps.state.tempEmails.sessionId = "123456";

  renderWithContext(<InboxContainer />, { storeProps });

  expect(screen.getByTestId("inbox-item")).toBeDefined();
  expect(screen.getByTestId("inbox-item")).toHaveTextContent(
    "Hey, happy Norowz!"
  );
});
