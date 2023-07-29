import { ComponentProps, useContext } from "react";
import { LANGUAGES } from "../../utils/languages";
import { LanguageContext } from "../../contexts/language-context";
import clsx from "clsx";

export function LanguageSwitcher({
  className,
  ...props
}: ComponentProps<"ul">) {
  const { selectedLanguage, setLanguage } = useContext(LanguageContext);

  return (
    <ul {...props} className={clsx("flex gap-2", className)}>
      {LANGUAGES.map((language) => (
        <li key={language}>
          <button
            onClick={() => setLanguage(language)}
            className={clsx({ ["underline"]: selectedLanguage === language })}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}
