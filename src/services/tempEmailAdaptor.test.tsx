import { it } from "vitest";
import { StoreProvider, useTempEmail } from "./store";
import { renderHook, act } from "@testing-library/react";
import { expect } from "chai";

it("should set the app state correctly", () => {
  const wrapper = ({ children }) => {
    return <StoreProvider>{children}</StoreProvider>;
  };

  const { result } = renderHook(() => useTempEmail(), { wrapper });

  expect(result.current.sessionID).toBe("");

  act(() => {
    result.current.setSession("xadfnjk23478234");
  });

  expect(result.current.sessionID).toBe("xadfnjk23478234");
  expect(typeof result.current.sessionID).toBe("string");

  act(() => {
    result.current.cleanState();
  });

  expect(result.current.sessionID).toBe("");
});
