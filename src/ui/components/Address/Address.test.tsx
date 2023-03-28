import { vi, it, expect } from "vitest";
import {
  screen,
  renderWithContext,
  waitForElementToBeRemoved,
  waitFor,
} from "@/tests/test-utils";
import Address from "./Address";
import GetAddressWithSessionResponse from "@/mocks/responses/GetAddressWithSession.json";
import type { IStoreContext } from "@/services/store/store";

let storeProps: IStoreContext;

beforeEach(() => {
  storeProps = {
    dispatch: vi.fn,
    state: {
      tempEmails: {
        sessionId: "123123",
        expiresAt: 0,
      },
    },
  };
});

it("should render correctly", () => {
  const { asFragment } = renderWithContext(<Address />, { storeProps });
  expect(asFragment()).toMatchSnapshot();
});

it("should display the loading spinner", () => {
  renderWithContext(<Address />, { storeProps });
  expect(screen.getByTestId("loading-spinner")).toHaveTextContent("Loading...");
});

it("should display the emails", async () => {
  renderWithContext(<Address />, { storeProps });

  const addresses = GetAddressWithSessionResponse.session.addresses;

  await waitForElementToBeRemoved(screen.queryByText("Loading..."));

  await waitFor(() => {
    addresses.forEach((address) => {
      expect(screen.getByText(address.address)).toBeDefined();
    });
  });
});

it("should display a message when there is no address", async () => {
  storeProps.state.tempEmails.sessionId = "123456";

  renderWithContext(<Address />, { storeProps });

  await waitFor(() => {
    expect(screen.getByText("No Active Address!")).toBeInTheDocument();
  });
});
