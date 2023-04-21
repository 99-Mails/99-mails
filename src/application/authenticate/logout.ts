import { useNotifier } from "@/services/notificationAdaptor";
import { useAuthentication } from "@/services/authenticationAdaptor";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function useLogout() {
  const [isLoggingOut, setLogginOut] = useState<boolean>(false);
  const authenticate = useAuthentication();
  const notifier = useNotifier();
  const router = useHistory();

  const logout = async () => {
    try {
      setLogginOut(true);

      const result = await authenticate.logOut();

      if (result.error?.status && result.error.status >= 400) {
        notifier.notifyError(result.error.name, result.error.message);
        return;
      }

      authenticate.setLogin(false);

      router.push("/");
    } catch (e: unknown) {
      throw new Error(e);
    } finally {
      setLogginOut(false);
    }
  };

  return {
    logout,
    isLoggingOut
  };
}

export { useLogout };
