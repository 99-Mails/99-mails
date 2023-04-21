import { useLogin } from "@/application/authenticate/login"
import { useLogout } from "@/application/authenticate/logout";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LogoutPage = () => {
  const login = useLogin();
  const logout = useLogout();
  const router = useHistory();

  useEffect(() => {
    if (login.alreadyLogined) {
      logout.logout()
    } else {
      router.push("/login")
    }
  }, [])

  return (<></>);
};

export { LogoutPage };
