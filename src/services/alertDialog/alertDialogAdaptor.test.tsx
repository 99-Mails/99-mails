import { it, vi, expect } from "vitest";
import { DialogProvider } from "./alertDialogContext";
import { useAlertDialog } from "./alertDialogAdaptor";
import { renderHook, act } from "@testing-library/react";

it("should abort the dialog when hits cancel button", () => {
  const abortFn = vi.fn();

  // @ts-ignore
  global.AbortController = vi.fn(() => ({
    abort: abortFn,
  }));

  const wrapper = ({ children }) => {
    return <DialogProvider>{children}</DialogProvider>;
  };

  const { result } = renderHook(() => useAlertDialog(), { wrapper });

  act(() => {
    result.current.cancelDialog();
  });

  // TODO: not working! undefined.
  // expect(result.current.signal).toBe(true);
  expect(abortFn).toHaveBeenCalledTimes(1);
});
