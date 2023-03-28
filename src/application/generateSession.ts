import { useEffect } from "react";
import { useCreateSessionWithRandomAddress } from "@/services/api";
import { useTempEmail } from "@/services/tempEmailAdaptor";

export function useGenerateSession() {
  const { setSession, cleanState, setExpiresAt } = useTempEmail();
  const [
    introduceSession,
    { data: SessionWithRandomAddress, loading: loadingRandomAddress },
  ] = useCreateSessionWithRandomAddress();

  useEffect(() => {
    const func = () => {
      if (SessionWithRandomAddress) {
        setSession(SessionWithRandomAddress?.introduceSession?.id);
        setExpiresAt(
          new Date(
            SessionWithRandomAddress?.introduceSession?.expiresAt
          ).getTime()
        );
      }
    };
    func();
    return () => setSession("");
  }, [loadingRandomAddress]);

  function generateSession() {
    cleanState();
    introduceSession();
  }

  return {
    generateSession,
  };
}
