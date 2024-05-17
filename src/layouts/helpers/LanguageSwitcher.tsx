import config from "@/config/config.json";
import languages from "@/config/language.json";
import React from "react";

const LanguageSwitcher = ({
  lang,
  pathname,
}: {
  lang: string;
  pathname: string;
}) => {
  const { default_language } = config.settings;

  return (
    <div className="mr-5">
      <select
        className="border border-dark text-dark bg-transparent dark:border-darkmode-primary dark:text-white py-1 rounded-sm dark:bg cursor-pointer"
        onChange={(e) => {
          const selectedLang = e.target.value;
          const newPath =
            selectedLang === default_language
              ? pathname.replace(`/${lang}`, "")
              : `/${selectedLang}${pathname.replace(`/${lang}`, "")}`;
          window.location.href = newPath;
        }}
        value={lang}
      >
        {languages.map((language) => (
          <option
            className="dark:text-dark"
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
