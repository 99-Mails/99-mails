import { actionTypes } from "./addressTimerSagaActions";

const ADDRESS_TIMEOUT = 10 * 60;

export const InitialState = {
  isDisabled: false,
  seconds: ADDRESS_TIMEOUT,
};

export type InitialState = typeof InitialState;

function addressTimer(state = InitialState, action = null) {
  switch (action.type) {
    case actionTypes.STOP:
      return { ...state, isDisabled: true };
    case actionTypes.START:
      return { ...state, isDisabled: false };
    case actionTypes.TICK:
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 };
      } else {
        return { ...state, seconds: 0 };
      }
    case actionTypes.RESET:
      return { ...state, seconds: ADDRESS_TIMEOUT };
    default:
      return state;
  }
}

export { addressTimer };
