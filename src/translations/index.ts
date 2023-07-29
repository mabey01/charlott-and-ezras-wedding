import { Language } from "../types/language";
import { german } from "./deutsch";
import { english } from "./english";

export type Translation = typeof english;

type TranslationMap = {
  [index in Language]: Translation;
};

export const TRANSLATIONS: TranslationMap = {
  en: english,
  de: german,
};
