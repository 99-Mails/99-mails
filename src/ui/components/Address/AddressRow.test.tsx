import { vi, it, expect } from "vitest";
import {
  renderWithContext,
  screen,
  userEvent,
} from "../../../tests/test-utils";
import type { IStoreContext } from "../../../services/store/store";
import AddressRow from "./AddressRow";

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

it("should render correctly", () => {
  const { asFragment } = renderWithContext(
    <AddressRow email="asd@fs.te" count={2} />,
    { storeProps }
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should display the email address and it's count", () => {
  renderWithContext(<AddressRow email="asd@fs.te" count={2} />, { storeProps });
  expect(screen.getByTestId("email-address")).toHaveTextContent("asd@fs.te");
});

it("should display the email count", () => {
  renderWithContext(<AddressRow email="asd@fs.te" count={2} />, { storeProps });
  expect(screen.getByTestId("email-count")).toHaveTextContent("2");
});

it("should be able to copy the email address to the clipboard", async () => {
  window.prompt = vi.fn();
  document.execCommand = vi.fn();

  const user = userEvent.setup();

  renderWithContext(<AddressRow email="asd@fs.te" count={2} />, { storeProps });

  const copyButton = screen.getByTestId("copy-address");
  await user.click(copyButton);

  expect(document.execCommand).toHaveBeenCalledOnce();
  expect(document.execCommand).toHaveBeenCalledWith("copy");
  expect(window.prompt).toHaveBeenCalledWith(
    "Copy to clipboard: Ctrl+C, Enter",
    "asd@fs.te"
  );
});
