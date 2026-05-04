import config from "@/config/config.json";
import languages from "@/config/language.json";
import React from "react";

const LanguageSwitcher = ({
  lang,
  switchTargets,
}: {
  lang: string;
  switchTargets: Record<string, string>;
}) => {
  const { default_language, disable_languages } = config.settings;
  const disabledLanguages = disable_languages as string[];

  const sortedLanguages = languages
    .filter(({ languageCode }) => !disabledLanguages.includes(languageCode))
    .sort((a, b) => a.weight - b.weight);

  if (sortedLanguages.length < 2) {
    return null;
  }

  return (
    <div className="mr-5">
      <select
        className="border-dark text-text-dark rounded-sm border bg-transparent py-1 focus:border-dark focus:ring-0 dark:border-darkmode-primary dark:text-white dark:focus:border-darkmode-primary"
        onChange={(event) => {
          const selectedLang = event.target.value;
          window.location.href =
            switchTargets[selectedLang] || switchTargets[default_language] || "/";
        }}
        value={lang}
      >
        {sortedLanguages.map((language) => (
          <option
            className="dark:text-text-dark"
            key={language.languageCode}
            value={language.languageCode}
          >
            {language.languageName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
