import { addressTimer } from "../sagas/addressTimer";
import { store } from "./redux";

export const rootReducer = { addressTimer };

export type RootState = ReturnType<typeof store.getState>;
