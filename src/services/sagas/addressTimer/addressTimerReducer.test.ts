import { it, expect } from 'vitest';
import { addressTimer as Reducer, type InitialState } from './addressTimerReducer';
import { actionTypes } from './addressTimerSagaActions';

it("should stop the timer correctly", () => {
  const state: InitialState = { isDisabled: false, seconds: 1 };
  const action = { type: actionTypes.STOP };
  const updatedState = Reducer(state, action);
  expect(updatedState).toEqual({ isDisabled: true, seconds: 1 });
});
