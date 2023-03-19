/**
 * Temp Email State
 * @type: sessionId: String
 * @method: cleanState: () => void
 * @method: setSessionId: (id: string) => void
 * @author: Mahdi Khashan
 * @version: 0.0.1 Alpha
 */

// TODO: replace it or move it to a shared space
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// export interface IAppContext {
//   sessionId: string;
//   setSessionId: (id: string) => void;
//   cleanState: () => void;
// }

export enum TempEmail {
  clean = "CLEAN_STATE",
  SetSession = "SET_SESSION_ID",
}

export type TempEmailInitialState = typeof tempEmailInitialState;

export type TempEmailPayloads = {
  [TempEmail.clean]: undefined;
  [TempEmail.SetSession]: {
    id: string;
  };
};

// | { type: "SET_SESSION_ID"; payload: { id: string } }
// | { type: "CLEAN_STATE" };

export type TempEmailActions =
  ActionMap<TempEmailPayloads>[keyof ActionMap<TempEmailPayloads>];

export const tempEmailInitialState = {
  sessionId: "",
};

const TempEmailReducer = (
  state: TempEmailInitialState,
  action: TempEmailActions
) => {
  switch (action.type) {
    case TempEmail.clean:
      return tempEmailInitialState;
    case TempEmail.SetSession:
      return {
        ...state,
        sessionId: action.payload.id,
      };
    default:
      throw new Error("unhandled action type");
  }
};

export { TempEmailReducer };
