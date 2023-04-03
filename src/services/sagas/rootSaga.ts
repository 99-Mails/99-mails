import { all } from "redux-saga/effects";
import {
  runTimer,
} from "./AddressTimer";

function* rootSaga() {
  yield all([runTimer()]);
}

export { rootSaga };
