// @ts-nocheck
import { it } from "vitest";
import { authInitialState, AuthReducer, Auth } from "./authReducer";

it("should set session correctly", () => {
  const state = authInitialState;
  const action = { type: Auth.session, payload: { session: { key: "1234" } } };
  const updatedState = AuthReducer(state, action);
  expect(updatedState).toEqual({
    session: {
      key: "1234",
    },
    user: null,
  });
});

it("should set user correctly", () => {
  const state = authInitialState;
  const action = {
    type: Auth.user,
    payload: { user: { email: "user@example.com" } },
  };
  const updatedState = AuthReducer(state, action);
  expect(updatedState).toEqual({
    session: null,
    user: {
      email: "user@example.com",
    },
  });
});
