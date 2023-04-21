import { useNotifier } from "@/services/notificationAdaptor";
import { useAuthentication } from "@/services/authenticationAdaptor";
import { useState } from "react";
import type { UserRegisterDTO } from "@/services/authenticate/supabase/register.type";

function useRegister() {
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false);
  const authenticate = useAuthentication();
  const notifier = useNotifier();

  const registerByEmail = async (user: UserRegisterDTO) => {
    try {
      setLoggingIn(true);

      const result = await authenticate.signUp(user);

      if (result.error?.status == 422) {
        notifier.notifyError(result.error.name, result.error.message);
      }

      if (!result.error) {
        console.log(result.data);
      }
    } catch (e: unknown) {
      throw new Error(e);
    } finally {
      setLoggingIn(false);
    }
  };

  return {
    isLoggingIn,
    registerByEmail,
  };
}

export { useRegister };
