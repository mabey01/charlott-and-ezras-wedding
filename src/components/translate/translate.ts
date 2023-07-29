import { useTranslation } from "../../hooks/use-translation";
import { TranslationKey } from "../../types/translations";

interface TranslateProps {
  k: TranslationKey;
}

export function Translate({ k }: TranslateProps) {
  const translation = useTranslation(k);

  return translation;
}
