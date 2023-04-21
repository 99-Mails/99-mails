/**
 * Temp Email State
 * @type: session: Session
 * @type: user: User
 * @method: setSession: () => void
 * @method: setSessionId: (id: string) => void
 * @author: Mahdi Khashan
 * @version: 0.0.1 Alpha
 */

import { ActionMap } from "@/types";

export enum Auth {
  session = "SESSION",
  user = "USER",
  setLogin = "SET_LOGIN"
}

export type AuthInitialState = typeof authInitialState;

export type AuthPayloads = {
  [Auth.session]: {
    session: object;
  };
  [Auth.user]: {
    user: object;
  };
  [Auth.setLogin]: {
    isLogin: boolean;
  }
};

export type AuthActions =
  ActionMap<AuthPayloads>[keyof ActionMap<AuthPayloads>];

export const authInitialState = {
  session: null,
  user: null,
  isLogin: false
};

const AuthReducer = (state: AuthInitialState, action: AuthActions) => {
  switch (action.type) {
    case Auth.session:
      return {
        ...state,
        session: action.payload.session,
      };
    case Auth.user:
      return {
        ...state,
        user: action.payload.user,
      };
    case Auth.setLogin:
      return {
        ...state,
        isLogin: action.payload.isLogin
      }
    default:
      return state;
  }
};

export { AuthReducer };
