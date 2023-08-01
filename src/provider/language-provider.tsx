import { ReactNode } from "react";
import { LanguageContext } from "../contexts/language-context";
import { getDefaultLanguage } from "../utils/get-default-language";
import { useLocalStorageValue } from "@react-hookz/web";

const STORAGE_KEY = "language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { value: language, set: setLanguage } = useLocalStorageValue(
    STORAGE_KEY,
    {
      initializeWithValue: true,
      defaultValue: getDefaultLanguage(),
    }
  );

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage: language, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
