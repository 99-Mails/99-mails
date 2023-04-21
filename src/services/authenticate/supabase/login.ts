import type { UserLoginDTO } from "./login.type";
import type { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";

export const signInWithEmail = async ({
  email,
  password,
}: UserLoginDTO): Promise<AuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};
