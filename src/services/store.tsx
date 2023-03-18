/* eslint-disable */
import { createContext, useReducer, useEffect } from "react";

const storagePrefix = "disposable_mail_";
const storageKey = storagePrefix + "root";

// type IStoreProviderProps = {
//   children: React.ReactNode[] | React.ReactNode;
// };

// type StoreState = {};

export interface IStoreContext {
  sessionId: string;
  setSessionId: (id: string) => void;
  // address: string[],
  // addAddress: (address: string) => void,
  cleanState: () => void;
}

// enum ActionType {
//   DEFAULT = "DEFAULT",
//   SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
//   CLEAR_ACCESS_TOKEN = "CLEAR_ACCESS_TOKEN",
//   SET_EXPIRES_IN = "SET_EXPIRES_IN",
//   CLEAR_EXPIRES_IN = "CLEAR_EXPIRES_IN",
//   SET_PROVIDER_TOKEN = "SET_PROVIDER_TOKEN",
//   CLEAR_PROVIDER_TOKEN = "CLEAR_PROVIDER_TOKEN",
//   SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN",
//   CLEAR_REFRESH_TOKEN = "CLEAR_REFRESH_TOKEN",
//   SET_TOKEN_TYPE = "SET_TOKEN_TYPE",
//   CLEAR_TOKEN_TYPE = "CLEAR_TOKEN_TYPE",
// }

// type Action =
//   | { type: "SET_ACCESS_TOKEN"; payload: { access_token: string } }
//   | { type: "CLEAR_ACCESS_TOKEN" }
//   | { type: "SET_EXPIRES_IN"; payload: { expires_in: number } }
//   | { type: "CLEAR_EXPIRES_IN" }
//   | { type: "SET_PROVIDER_TOKEN"; payload: { provider_token: string } }
//   | { type: "CLEAR_PROVIDER_TOKEN" }
//   | { type: "SET_REFRESH_TOKEN"; payload: { refresh_token: string } }
//   | { type: "CLEAR_REFRESH_TOKEN" }
//   | { type: "SET_TOKEN_TYPE"; payload: { token_type: string } }
//   | { type: "CLEAR_TOKEN_TYPE" };

const initialState = {
  sessionID: null,
  // address: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAN_STATE":
      return initialState;
    case "SET_SESSION_ID":
      return {
        ...state,
        sessionID: action.payload.id,
      };
    // case "ADD_ADDRESS":
    //   return {
    //     ...state,
    //     address: [...state.address, action.payload.address]
    //   }
    default:
      throw new Error("unhandled action type");
  }
};

export const StoreContext = createContext<IStoreContext | null>(null);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value = {
    // address: state.address,
    sessionId: state.sessionID,
    cleanState: () => dispatch({ type: "CLEAN_STATE" }),
    setSessionId: (id: string) =>
      dispatch({ type: "SET_SESSION_ID", payload: { id } }),
    // addAddress: (address: string) => dispatch({ type: "ADD_ADDRESS", payload: { address } }),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider };
