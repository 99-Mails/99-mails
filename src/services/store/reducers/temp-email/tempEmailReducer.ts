/**
 * Temp Email State
 * @type: sessionId: String
 * @type: expiresAt: BigInt
 * @method: cleanState: () => void
 * @method: setSessionId: (id: string) => void
 * @method: setSessionExpiration: (expiresAt: bigint) => void
 * @author: Mahdi Khashan
 * @version: 0.0.1 Alpha
 */

import { ActionMap } from "@/types";

export enum TempEmail {
  clean = "CLEAN_STATE",
  setSession = "SET_SESSION_ID",
  setSessionExpiration = "SET_SESSION_EXPIRATION",
}

export type TempEmailInitialState = typeof tempEmailInitialState;

export type TempEmailPayloads = {
  [TempEmail.clean]: undefined;
  [TempEmail.setSession]: {
    id: string;
  };
  [TempEmail.setSessionExpiration]: {
    expiresAt: number;
  };
};

export type TempEmailActions =
  ActionMap<TempEmailPayloads>[keyof ActionMap<TempEmailPayloads>];

export const tempEmailInitialState = {
  sessionId: "",
  expiresAt: 0,
};

const TempEmailReducer = (
  state: TempEmailInitialState,
  action: TempEmailActions
) => {
  switch (action.type) {
    case TempEmail.clean:
      return tempEmailInitialState;
    case TempEmail.setSession:
      return {
        ...state,
        sessionId: action.payload.id,
      };
    case TempEmail.setSessionExpiration:
      return {
        ...state,
        expiresAt: action.payload.expiresAt,
      };
    default:
      return state
  }
};

export { TempEmailReducer };
