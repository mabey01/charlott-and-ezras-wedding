import { ReactNode, useState } from "react";
import { LanguageContext } from "../contexts/language-context";
import { getDefaultLanguage } from "../utils/get-default-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(getDefaultLanguage());

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage: language, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
