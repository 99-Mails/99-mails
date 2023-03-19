import { useContext } from "react";
import { StoreContext } from "./store";

function useStore() {
  const store = useContext(StoreContext);

  const sessionID = store.sessionId;
  const setSession = (id: string) => store.setSessionId?.(id);

  const cleanState = () => store.cleanState?.();

  return {
    sessionID,
    setSession,
    cleanState,
  };
}

export { useStore };
