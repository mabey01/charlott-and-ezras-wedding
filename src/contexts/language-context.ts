import { createContext } from "react";
import { Language } from "../types/language";

type LanguageContext = {
  selectedLanguage: Language;
  setLanguage: (language: Language) => void;
};

export const LanguageContext = createContext<LanguageContext>({
  selectedLanguage: "en",
  setLanguage: () => null,
});
