import { createContext, useReducer, useEffect } from "react";

const storagePrefix = "disposable_mail_";
const storageKey = storagePrefix + "root";

type IStoreProviderProps = {
  children: React.ReactNode[] | React.ReactNode;
};

type StoreState = typeof initialState;

export interface IStoreContext {
  sessionId: string;
  setSessionId: (id: string) => void;
  cleanState: () => void;
}

type Action =
  | { type: "SET_SESSION_ID"; payload: { id: string } }
  | { type: "CLEAN_STATE" };

const initialState = {
  sessionID: "",
};

const reducer = (state: StoreState, action: Action) => {
  switch (action.type) {
    case "CLEAN_STATE":
      return initialState;
    case "SET_SESSION_ID":
      return {
        ...state,
        sessionID: action.payload.id,
      };
    default:
      throw new Error("unhandled action type");
  }
};

// TODO: improve typing for createContext to prevent ?. in it's hook!
export const StoreContext = createContext<Partial<IStoreContext>>({});

const StoreProvider = ({ children }: IStoreProviderProps) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    // @ts-ignore
    (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value = {
    sessionId: state.sessionID,
    cleanState: () => dispatch({ type: "CLEAN_STATE" }),
    setSessionId: (id: string) =>
      dispatch({ type: "SET_SESSION_ID", payload: { id } }),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider };
