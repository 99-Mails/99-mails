import { render } from "@/tests/test-utils";
import { it, expect } from "vitest";
import AlertDialogWrapper from "./alertDialog";

it("should render correctly", () => {
  const { asFragment } = render(
    <AlertDialogWrapper
      body="alert-body"
      cancelRef={null}
      header="alert-header"
      isCancelable={false}
      isLoading={true}
      isOpen={false}
      onCancel={() => {}}
      onClick={() => {}}
      onClose={() => {}}
    />
  );
  expect(asFragment).toMatchSnapshot();
});
