import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducer";
import { rootSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: combineReducers(rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
