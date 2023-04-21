import { renderHook, act } from "@testing-library/react";
import { useReducer } from "react";
import { it } from "vitest";
import { combineReducers } from "./combine-reducers";

const initialState = {
  one: 0,
  two: 0,
};

function firstReducer(state, action) {
  switch (action.type) {
    case "ACTION_ONE":
      return { ...state, one: action.payload.one };
    default:
      return state;
  }
}

function secondReducer(state, action) {
  switch (action.type) {
    case "ACTION_TWO":
      return { ...state, two: action.payload.two };
  }
  throw new Error(`Unknown Action: ${action.type}`)
}

it("should combine reducers correctly, fails on purpose", () => {
  const reducers = combineReducers({ firstReducer, secondReducer });
  const { result } = renderHook(() => useReducer(reducers, initialState))
  const [state, dispatch] = result.current

  act(() => {
    dispatch({ type: "UPDATE",  payload: 1})
  })
  
  expect(state).toEqual({ one: 0, two: 1});
});
