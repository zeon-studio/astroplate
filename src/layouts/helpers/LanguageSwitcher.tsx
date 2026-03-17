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
  const { default_language, default_language_in_subdir } = config.settings;

  // Function to remove trailing slash if necessary
  const removeTrailingSlash = (path: string) => {
    if (!config.site.trailing_slash) {
      return path.replace(/\/$/, "");
    }
    return path;
  };

  // Sort languages by weight and filter out disabled languages
  const sortedLanguages = languages
    .filter(
      (language) =>
        !(config.settings.disable_languages as string[]).includes(
          language.languageCode,
        ),
    )
    .sort((a, b) => a.weight - b.weight);

  return (
    <div className={`mr-5 ${sortedLanguages.length > 1 ? "block" : "hidden"}`}>
      <select
        className="border border-dark text-text-dark bg-transparent dark:border-darkmode-primary dark:text-white py-1 rounded-sm cursor-pointer focus:ring-0 focus:border-dark dark:focus:border-darkmode-primary"
        onChange={(e) => {
          const selectedLang = e.target.value;
          let newPath;
          const baseUrl = window.location.origin;

          // Safely remove the current language prefix from the pathname
          let pathWithoutLang = pathname;
          if (pathname.startsWith(`/${lang}/`)) {
            pathWithoutLang = pathname.substring(lang.length + 1);
          } else if (pathname === `/${lang}`) {
            pathWithoutLang = "/";
          }

          if (selectedLang === default_language) {
            if (default_language_in_subdir) {
              newPath = `${baseUrl}/${default_language}${removeTrailingSlash(pathWithoutLang)}`;
            } else {
              newPath = `${baseUrl}${removeTrailingSlash(pathWithoutLang)}`;
            }
          } else {
            newPath = `/${selectedLang}${removeTrailingSlash(pathWithoutLang)}`;
          }

          window.location.href = newPath;
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
