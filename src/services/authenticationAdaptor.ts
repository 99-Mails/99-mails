import { AuthenticationService } from "@/application/ports";
import { useContext } from "react";
import { signInWithEmail, signOut, register } from "./authenticate/supabase";
import type { UserLoginDTO } from "./authenticate/supabase/login.type";
import type { UserRegisterDTO } from "./authenticate/supabase/register.type";
import { StoreContext } from "./store";
import { Auth } from "./store/reducers";

export function useAuthentication(): AuthenticationService {
  const store = useContext(StoreContext);

  const getUser = store.state.auth.user;
  const getSession = store.state.auth.session;

  const isLogined = store.state.auth.isLogin;

  const setLogin = (isLogin: boolean) =>
    store.dispatch({ type: Auth.setLogin, payload: { isLogin } });

  const setUser = (user: any) =>
    store.dispatch({ type: Auth.user, payload: { user } });

  const setSession = (session: any) =>
    store.dispatch({ type: Auth.session, payload: { session } });

  const signUp = (user: UserRegisterDTO) => register(user);
  const logIn = (user: UserLoginDTO) => signInWithEmail(user);
  const logOut = () => signOut();

  return {
    logIn,
    logOut,
    signUp,
    getUser,
    getSession,
    setUser,
    setSession,
    isLogined,
    setLogin,
  };
}
