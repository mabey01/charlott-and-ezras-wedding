import { Language } from "../types/language";
import { LANGUAGES } from "./languages";

export function getDefaultLanguage(): Language {
  const browserLanguages = navigator.languages;
  const supportedLanguage = LANGUAGES.find((language) =>
    browserLanguages.find((browserLanguage) =>
      browserLanguage.includes(language)
    )
  );
  if (supportedLanguage) {
    return supportedLanguage;
  }

  return "en";
}
