import { call, put, select, take } from "redux-saga/effects";
import { ONE_SECOND, wait } from "../utils";
import { actionTypes, Stop, Tick } from "./addressTimerSagaActions";
import {
  getAddressTimerIsDisabled,
  getAddressTimerSeconds,
} from "./addressTImerSelector";

export function* disableTimer() {
  yield take(actionTypes.START);
}

export function* enableTimer() {
  yield take(actionTypes.START);
}

export function* runTimer() {
  // The sagasMiddleware will start running this generator.

  // Wake up when user starts timer.
  while (yield take(actionTypes.START)) {
    while (true) {
      // This side effect is not run yet, so it can be treated
      // as data, making it easier to test if needed.
      yield call(wait, ONE_SECOND);

      const isDisabled = yield select(getAddressTimerIsDisabled);
      const seconds = yield select(getAddressTimerSeconds);

      // Check if the timer is still running.
      // If so, then dispatch a TICK.
      if (!isDisabled && seconds) {
        yield put(Tick());
        // Otherwise, go idle until user starts the timer again.
      } else {
        yield put(Stop());
        break;
      }
    }
  }
}

export function* resetTimer() {
  yield put({ type: actionTypes.RESET });
}
