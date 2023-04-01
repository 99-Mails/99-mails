import { all } from "redux-saga/effects";
import {
  disableTimer,
  enableTimer,
  resetTimer,
  runTimer,
} from "./addressTimer";

function* rootSaga() {
  yield all([runTimer()]);
}

export { rootSaga };
