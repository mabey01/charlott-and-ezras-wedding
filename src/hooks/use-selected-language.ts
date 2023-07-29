import { useContext } from "react";
import { LanguageContext } from "../contexts/language-context";

export function useSelectedLanguage() {
  return useContext(LanguageContext).selectedLanguage;
}
