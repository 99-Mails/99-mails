import { useContext } from "react";
import { StoreContext } from "./store";

function useStore() {
  const store = useContext(StoreContext)

  const sessionID = store.sessionId
  const setSession = (id: string) => store.setSessionId(id) 

  // const address = store.address
  // const addAddress = (address: string) => store.addAddress(address)

  const cleanState = () => store.cleanState()

  return {
    // address,
    sessionID,
    setSession,
    // addAddress,
    cleanState
  }
}

export { useStore };
