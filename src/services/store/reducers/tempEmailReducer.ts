/**
 * Temp Email State
 * @type: sessionId: String
 * @method: cleanState: () => void
 * @method: setSessionId: (id: string) => void
 * @author: Mahdi Khashan
 * @version: 0.0.1 Alpha
 */

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
