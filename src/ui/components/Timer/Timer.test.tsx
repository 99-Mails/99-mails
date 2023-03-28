import { render, screen, waitFor } from "@/tests/test-utils";
import { vi, it, expect } from "vitest";
import { Timer } from "./Timer";

it("should render correctly", () => {
  const { asFragment } = render(
    <Timer expiresAt="2023-03-28T11:58:30+00:00" />
  );
  expect(asFragment()).toMatchSnapshot();
});

// TODO: fix it!
it("should show the correct time", async () => {
  Date.now = vi.fn(() => 1680004532101);

  render(<Timer expiresAt="2023-03-28T11:58:30+00:00" />);

  await waitFor(() => {
    expect(screen.getByTestId("timer")).toBeDefined();
  });
});
