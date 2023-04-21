import { createContext, useReducer, useEffect, Dispatch, useMemo } from "react";
import {
  TempEmailReducer,
  TempEmailActions,
  tempEmailInitialState,
} from "./reducers/temp-email";
import {
  AuthActions,
  AuthInitialState,
  authInitialState,
  AuthReducer,
} from "./reducers/auth";
import type { TempEmailInitialState } from "./reducers";
import { combineReducers } from "./combine-reducers";

const storagePrefix = "disposable_mail_";
const storageKey = storagePrefix + "root";

type IStoreProviderProps = {
  children: React.ReactNode;
};

type ActionTypes = AuthActions | TempEmailActions;

export interface IStoreContext {
  state: InitialStateType;
  dispatch: Dispatch<ActionTypes>;
}

type InitialStateType = {
  tempEmails: TempEmailInitialState;
  auth: AuthInitialState;
};

const initialState = {
  tempEmails: tempEmailInitialState,
  auth: authInitialState,
};

export const StoreContext = createContext<IStoreContext>({
  state: initialState,
  dispatch: () => null,
});

// TODO: should memoize the store
const StoreProvider = ({ children }: IStoreProviderProps) => {
  const [state, dispatch] = useReducer(
    combineReducers({
      tempEmails: TempEmailReducer,
      auth: AuthReducer,
    }),
    initialState,
    // @ts-ignore
    (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial
  );

  // const store = useMemo(() => { state, dispatch }, [state]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
