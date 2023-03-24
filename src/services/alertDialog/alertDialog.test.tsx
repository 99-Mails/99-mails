import { it } from "vitest";
import { render } from "@/tests/test-utils";
import { DialogProvider } from "./alertDialog";
import { useAlertDialog } from "./alertDialogAdaptor";
import { renderHook, act } from "@testing-library/react";

// TODO: should write a test!
it.skip("should set the header correctly", async () => {
  // const { container } = render(<div />, {
  //   wrapper: ({ children }) => {
  //     return <DialogProvider>{children}</DialogProvider>;
  //   },
  // });

  const wrapper = ({ children }) => {
    return <DialogProvider>{children}</DialogProvider>;
  };

  // const dialog = useAlertDialog();

  // const action = await dialog.openDialog({
  //   body: "Are you sure?",
  //   header: "Delete Address",
  // });

  const { result } = renderHook(() => useAlertDialog(), { wrapper });

  act(() => {
    result.current.openDialog({
      body: "Are you sure?",
      header: "Delete Address",
    });
  });

  expect(result.current).toContain("Delete Address");
});
