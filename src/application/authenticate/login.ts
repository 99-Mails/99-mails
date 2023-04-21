import { useNotifier } from "@/services/notificationAdaptor";
import { useAuthentication } from "@/services/authenticationAdaptor";
import { useState } from "react";
import type { UserLoginDTO } from "@/services/authenticate/supabase/login.type";
import { useHistory } from "react-router-dom";

function useLogin() {
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false);
  const authenticate = useAuthentication();
  const notifier = useNotifier();
  const router = useHistory();

  const loginByEmail = async (user: UserLoginDTO) => {
    try {
      setLoggingIn(true);

      const result = await authenticate.logIn(user);

      if (result.error?.status && result.error.status >= 400) {
        notifier.notifyError(result.error.name, result.error.message);
        return;
      }

      authenticate.setSession(result.data.session);
      authenticate.setUser(result.data.user);
      authenticate.setLogin(true);

      router.push("/dashboard");
    } catch (e: unknown) {
      throw new Error(e);
    } finally {
      setLoggingIn(false);
    }
  };

  return {
    isLoggingIn,
    loginByEmail,
    alreadyLogined: authenticate.isLogined
  };
}

export { useLogin };
