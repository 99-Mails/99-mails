import { useContext } from "react";
import { TempEmail } from "./store/reducers";
import { StoreContext } from "./store/store";

function useTempEmail() {
  const store = useContext(StoreContext);

  const sessionID = store.state.tempEmails.sessionId;

  const setSession = (id: string) =>
    store.dispatch({ type: TempEmail.setSession, payload: { id } });

  const cleanState = () => store.dispatch({ type: TempEmail.clean });

  const expiresAt = store.state.tempEmails.expiresAt;

  const setExpiresAt = (expiresAt: number) =>
    store.dispatch({
      type: TempEmail.setSessionExpiration,
      payload: { expiresAt },
    });

  return {
    sessionID,
    setSession,
    cleanState,
    expiresAt,
    setExpiresAt,
  };
}

export { useTempEmail };
