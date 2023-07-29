import { TRANSLATIONS, Translation } from "../translations";
import { TranslationKey } from "../types/translations";
import { useSelectedLanguage } from "./use-selected-language";

function getTranslation(translation: Translation, key: TranslationKey) {
  return (
    key
      .split(".")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .reduce((a, b) => a[b], translation) as unknown as string
  );
}

export function useTranslation(key: TranslationKey): string {
  const language = useSelectedLanguage();
  const translation = TRANSLATIONS[language];

  return getTranslation(translation, key);
}
