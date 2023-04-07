import { all } from "redux-saga/effects";
import {
  runTimer,
} from "./addressTimer";

function* rootSaga() {
  yield all([runTimer()]);
}

export { rootSaga };
