import { render, screen, waitFor } from "@/tests/test-utils";
import { vi, it, expect } from "vitest";
import { Timer } from "./Timer";

it("should render correctly", () => {
  const { asFragment } = render(<Timer time={10} isDisabled={false} />);
  expect(asFragment()).toMatchSnapshot();
});

// TODO: fix it!
it("should show the correct time", async () => {
  Date.now = vi.fn(() => 1680004532101);

  render(<Timer time={10} isDisabled={false} />);

  await waitFor(() => {
    expect(screen.getByTestId("timer")).toBeDefined();
  });
});
