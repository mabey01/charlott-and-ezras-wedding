import { ReactNode, useMemo } from "react";

import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { SupabaseContext } from "../contexts/supabase-context";
import { SUPABASE_KEY, SUPABASE_URL } from "../config";

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const client = useMemo(
    () => createClient<Database>(SUPABASE_URL, SUPABASE_KEY),
    []
  );

  return (
    <SupabaseContext.Provider value={{ client }}>
      {children}
    </SupabaseContext.Provider>
  );
}
