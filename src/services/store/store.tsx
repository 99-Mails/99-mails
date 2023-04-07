import { createContext, useReducer, useEffect, Dispatch } from "react";
import {
  TempEmailReducer,
  TempEmailActions,
  TempEmailInitialState,
  tempEmailInitialState,
} from "./reducers/tempEmailReducer";

const storagePrefix = "disposable_mail_";
const storageKey = storagePrefix + "root";

type IStoreProviderProps = {
  children: React.ReactNode[] | React.ReactNode;
};

type ActionTypes = TempEmailActions;

export interface IStoreContext {
  state: InitialStateType;
  dispatch: Dispatch<ActionTypes>;
}

type InitialStateType = {
  tempEmails: TempEmailInitialState;
};

const initialState = {
  tempEmails: tempEmailInitialState,
};

export const StoreContext = createContext<IStoreContext>({
  state: initialState,
  dispatch: () => null,
});

const rootReducer = (
  { tempEmails }: InitialStateType,
  action: ActionTypes
) => ({
  tempEmails: TempEmailReducer(tempEmails, action),
});

const StoreProvider = ({ children }: IStoreProviderProps) => {
  const [state, dispatch] = useReducer(
    rootReducer,
    initialState,
    // @ts-ignore
    (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial
  );

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
