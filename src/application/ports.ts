import { UserLoginDTO } from "@/services/authenticate/supabase/login.type";
import { UserRegisterDTO } from "@/services/authenticate/supabase/register.type";
import type { Fn } from "@/types";
import type { AuthResponse } from "@supabase/supabase-js";

export interface NotificationService {
  notifySuccess(title: string, description: string): void;
  notifyError(title: string, description: string): void;
}

export interface APIService {
  useCreateEmptySession: Fn;
  useGetSession: Fn;
  useCreateSessionWithRandomAddress: Fn;
  useListSessionsWithMails: Fn;
  useAddAddressToSession: Fn;
  useGetAddressWithSession: Fn;
  useListDomains: Fn;
  useFetchIncomingEmails: Fn;
  useDeleteAddress: Fn;
}

export interface AlertDialogService {
  openDialog: Fn;
  closeDialog: Fn;
  cancelDialog: Fn;
  isLoading: Fn;
  stopLoading: Fn;
  signal: AbortSignal;
}

// TODO: improve types
export interface AuthenticationService {
  logIn: (user: UserLoginDTO) => Promise<AuthResponse>;
  logOut: () => Promise<Pick<AuthResponse, "error">>;
  signUp: (user: UserRegisterDTO) => Promise<AuthResponse>;
  getUser: any;
  getSession: any;
  setUser: Fn;
  setSession: Fn;
  setLogin: Fn;
  isLogined: boolean;
}
