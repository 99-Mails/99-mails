import type { AuthResponse } from "@supabase/supabase-js";
import type { UserRegisterDTO } from "./register.type";
import { supabase } from "../../supabaseClient";

export const register = async ({
  email,
  password,
}: UserRegisterDTO): Promise<AuthResponse> => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};
