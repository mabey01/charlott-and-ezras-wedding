import { useContext } from "react";
import { SupabaseContext } from "../contexts/supabase-context";

export function useSupabaseContext() {
  const supabaseContext = useContext(SupabaseContext);
  if (!supabaseContext) {
    throw new Error("SupabaseProvider is missing");
  }

  return supabaseContext;
}
