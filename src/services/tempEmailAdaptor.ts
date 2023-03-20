import { useContext } from "react";
import { TempEmail } from "./store/reducers";
import { StoreContext } from "./store/store";

function useTempEmail() {
  const store = useContext(StoreContext);

  const sessionID = store.state.tempEmails.sessionId;
  const setSession = (id: string) =>
    store.dispatch({ type: TempEmail.SetSession, payload: { id } });

  const cleanState = () => store.dispatch({ type: TempEmail.clean });

  return {
    sessionID,
    setSession,
    cleanState,
  };
}

export { useTempEmail };
