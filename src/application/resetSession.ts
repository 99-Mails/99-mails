import { useEffect } from "react";
import { useCreateSessionWithRandomAddress } from "../services/api";
import { useStore } from "../services/storeService";

export function useResetSession() {
  const [
    introduceSession,
    { data: SessionWithRandomAddress, loading: loadingRandomAddress },
  ] = useCreateSessionWithRandomAddress();

  const { setSession, cleanState } = useStore();

  // FIXIT
  useEffect(() => {
    const func = () => {
      if (SessionWithRandomAddress) {
        setSession(SessionWithRandomAddress?.introduceSession?.id);
      }
    };
    func();
    return () => setSession("");
  }, [loadingRandomAddress]);

  function resetSession() {
    cleanState();
    introduceSession();
  }

  return {
    resetSession,
  };
}
