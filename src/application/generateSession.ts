import { useEffect } from "react";
import { useCreateSessionWithRandomAddress } from "@/services/api";
import { useTempEmail } from "@/services/tempEmailAdaptor";
import { useDispatch } from "react-redux";
import { AddressTimerActions } from "@/services/sagas";

// TODO: should keep the session when user wants to login
export function useGenerateSession() {
  const { setSession, cleanState, setExpiresAt } = useTempEmail();
  const [
    introduceSession,
    { data: SessionWithRandomAddress, loading: loadingSession },
  ] = useCreateSessionWithRandomAddress();

  const dispatch = useDispatch();

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

  useEffect(() => {
    func();
  
    return () => setSession("");
  }, [loadingSession]);

  function generateSession() {
    cleanState();
    try {
      introduceSession();
    } catch (e) {
      throw new Error(`Error generating session: ${e}`);
    }
    // introduceSession();
    dispatch({ type: AddressTimerActions.actionTypes.RESET });
  }

  return {
    generateSession,
    loadingSession,
  };
}
