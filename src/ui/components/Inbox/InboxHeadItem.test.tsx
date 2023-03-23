import { it, expect } from "vitest";
import { render } from "../../../tests/test-utils";
import { InboxHeadItem } from "./InboxItem";

it("should render correctly", () => {
  const { asFragment } = render(
    <InboxHeadItem text="subject" value="this is a mail" />
  );
  expect(asFragment()).toMatchSnapshot();
});
