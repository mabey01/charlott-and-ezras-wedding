import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";
import { Database } from "../types/supabase";

type SupabaseContext = {
  client: SupabaseClient<Database, "public">;
};

export const SupabaseContext = createContext<SupabaseContext | undefined>(
  undefined
);
