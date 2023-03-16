import { useEffect } from "react";
import { useSession } from "../services/api";
import useStore from "../services/storeService";

export function useResetSession() {
  const { createSessionWithRandomAddress } = useSession();
  const [
    introduceSession,
    { data: SessionWithRandomAddress, loading: loadingRandomAddress, error },
  ] = createSessionWithRandomAddress();

  const { setSession, cleanState } = useStore();

  useEffect(() => {
    const func = () => {
      if (!!SessionWithRandomAddress) {
        setSession(SessionWithRandomAddress?.introduceSession?.id);
      }
    };
    func();
  }, [loadingRandomAddress]);

  function resetSession() {
    cleanState();
    introduceSession();
  }

  return {
    resetSession,
  };
}
