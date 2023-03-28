import { it } from "vitest";
import {
  tempEmailInitialState,
  TempEmailReducer,
  TempEmail,
} from "./tempEmailReducer";

it("should clean the state correctly", () => {
  const state = { sessionId: "1234567890" };
  const action = { type: TempEmail.clean };
  // @ts-ignore
  const updatedState = TempEmailReducer(state, action);
  expect(updatedState).toEqual(tempEmailInitialState);
});

it("should set session correctly", () => {
  const state = tempEmailInitialState;
  const action = { type: TempEmail.SetSession, payload: { id: "1234567890" } };
  // @ts-ignore
  const updatedState = TempEmailReducer(state, action);
  expect(updatedState).toEqual({ sessionId: "1234567890", expiresAt: 0 });
});

it("should set session expiration time correctly", () => {
  const state = tempEmailInitialState;
  const action = {
    type: TempEmail.SetSessionExpiration,
    payload: { expiresAt: "999999999" },
  };
  // @ts-ignore
  const updatedState = TempEmailReducer(state, action);
  expect(updatedState).toEqual({ expiresAt: "999999999", sessionId: "" });
});
