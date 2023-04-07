import { it, expect } from "vitest";
import { MailSummary } from "@/domains/Mail";
import { render, screen } from "@/tests/test-utils";
import { InboxItem } from "./InboxItem";
import { InboxBody } from "./Inbox";

const downloadUrl: URL = new URL("http://downloadUrl.example.com/data.json");

const mail: MailSummary = {
  headerSubject: "My mail header",
  text: "My mail body",
  fromAddr: "admin@example.com",
  downloadUrl: downloadUrl,
  toAddr: "temp-email-address@my-mail-provider.com",
};

it("should render correctly", () => {
  const { asFragment } = render(
    <InboxBody>
      <InboxItem mail={mail} />
    </InboxBody>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("should have the correct body and subject-header", () => {
  render(
    <InboxBody data-testid="inbox-wrapper">
      <InboxItem mail={mail} />
    </InboxBody>
  );

  expect(screen.getByTestId("inbox-wrapper")).toHaveTextContent(
    "My mail header"
  );
  expect(screen.getByTestId("inbox-wrapper")).toHaveTextContent("My mail body");
});
