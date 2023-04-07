import { render, screen } from "@/tests/test-utils";
import { it, expect } from "vitest";
import { Timer } from "./Timer";

it("should render correctly", () => {
  const { asFragment } = render(<Timer time={10} isDisabled={false} />);
  expect(asFragment()).toMatchSnapshot();
});

it("should show the correct time", async () => {
  render(<Timer time={10} isDisabled={false} />);

  expect(screen.getByTestId("timer")).toHaveTextContent("00:10");
});
