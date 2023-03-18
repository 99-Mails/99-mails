import { vi, it, expect } from "vitest";
import { render, screen, userEvent } from "../../../tests/test-utils";
import AddressRow from "./AddressRow";

it("should render correctly", () => {
  const { asFragment } = render(<AddressRow email="asd@fs.te" count={2} />);
  expect(asFragment()).toMatchSnapshot();
})

it("should display the email address and it's count", () => {
  render(<AddressRow email="asd@fs.te" count={2} />);
  expect(screen.getByTestId("email-address")).toHaveTextContent("asd@fs.te");
});

it("should display the email count", () => {
  render(<AddressRow email="asd@fs.te" count={2} />);
  expect(screen.getByTestId("email-count")).toHaveTextContent("2");
})

it("should be able to copy the email address to the clipboard", async () => {
  window.prompt = vi.fn()
  document.execCommand = vi.fn()

  const user = userEvent.setup()

  render(<AddressRow email="asd@fs.te" count={2} />);

  const copyButton = screen.getByRole("button");
  await user.click(copyButton);

  expect(document.execCommand).toHaveBeenCalledOnce();
  expect(document.execCommand).toHaveBeenCalledWith("copy");
  expect(window.prompt).toHaveBeenCalledWith("Copy to clipboard: Ctrl+C, Enter", "asd@fs.te");
});
