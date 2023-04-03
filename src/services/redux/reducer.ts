import { addressTimer } from "../sagas/AddressTimer";
import { store } from "./redux";

export const rootReducer = { addressTimer };

export type RootState = ReturnType<typeof store.getState>;
