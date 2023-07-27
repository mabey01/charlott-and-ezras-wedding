import { ReactNode, useEffect } from "react";
import { UserContext } from "../contexts/user-context";

const STORAGE_KEY = "unique_user_id";

function useLocalStorage(key: string, getDefaultValue: () => string) {
  const storedValue = window.localStorage.getItem(key);
  const value = storedValue ?? getDefaultValue();

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return value;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const value = useLocalStorage(STORAGE_KEY, () => crypto.randomUUID());

  return (
    <UserContext.Provider value={{ uniqueUserID: value }}>
      {children}
    </UserContext.Provider>
  );
}
