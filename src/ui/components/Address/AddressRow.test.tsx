import { vi, it, expect } from "vitest";
import { renderWithContext, screen, userEvent } from "@/tests/test-utils";
import type { IStoreContext } from "@/services/store/store";
import { AddressRow } from "./AddressRow";
import type { AddressID } from "@/domains/Address";

let storeProps: IStoreContext;

let address: AddressID = {
  address: "asd@fs.te",
  id: "asdfasdfasdfsdfasdf",
};

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
  const { asFragment } = renderWithContext(
    <AddressRow address={address.address} id={address.id} />,
    { storeProps }
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should display the email address and it's count", () => {
  renderWithContext(<AddressRow address={address.address} id={address.id} />, {
    storeProps,
  });
  expect(screen.getByTestId("email-address")).toHaveTextContent("asd@fs.te");
});

it.skip("should display the email count", () => {
  renderWithContext(<AddressRow address={address.address} id={address.id} />, {
    storeProps,
  });
  expect(screen.getByTestId("email-count")).toHaveTextContent("2");
});

it("should be able to copy the email address to the clipboard", async () => {
  window.prompt = vi.fn();
  document.execCommand = vi.fn();

  const user = userEvent.setup();

  renderWithContext(<AddressRow address={address.address} id={address.id} />, {
    storeProps,
  });

  const copyButton = screen.getByTestId("copy-address");
  await user.click(copyButton);

  expect(document.execCommand).toHaveBeenCalledOnce();
  expect(document.execCommand).toHaveBeenCalledWith("copy");
  expect(window.prompt).toHaveBeenCalledWith(
    "Copy to clipboard: Ctrl+C, Enter",
    "asd@fs.te"
  );
});

// TODO: find a way to test it,
//       maybe check if it's not availabe anymore in the dom
// it("should be able to remove the email address from the session", async () => {
//   const user = userEvent.setup();

//   renderWithContext(<AddressRow address={address} count={2} />, { storeProps });

//   const deleteButton = screen.getByTestId("delete-address");
//   await user.click(deleteButton);

//   expect(true).toBe(true);
// });
