import type { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";

export const signOut = async (): Promise<Pick<AuthResponse, "error">> =>
  await supabase.auth.signOut();
