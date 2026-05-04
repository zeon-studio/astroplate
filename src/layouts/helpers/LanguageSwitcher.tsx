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
  const { default_language, default_language_in_subdir, disable_languages } =
    config.settings;
  const disabledLanguages = disable_languages as string[];

  const sortedLanguages = languages
    .filter(({ languageCode }) => !disabledLanguages.includes(languageCode))
    .sort((a, b) => a.weight - b.weight);

  const removeTrailingSlash = (path: string) => {
    if (config.site.trailing_slash) {
      return path === "/" ? "/" : path.replace(/\/?$/, "/");
    }

    return path !== "/" ? path.replace(/\/$/, "") : path;
  };

  const removeCurrentLangPrefix = (path: string) => {
    const prefix = `/${lang}`;
    if (lang !== default_language && path.startsWith(prefix)) {
      const withoutLang = path.slice(prefix.length) || "/";
      return withoutLang.startsWith("/") ? withoutLang : `/${withoutLang}`;
    }

    if (
      lang === default_language &&
      default_language_in_subdir &&
      path.startsWith(prefix)
    ) {
      const withoutLang = path.slice(prefix.length) || "/";
      return withoutLang.startsWith("/") ? withoutLang : `/${withoutLang}`;
    }

    return path || "/";
  };

  if (sortedLanguages.length < 2) {
    return null;
  }

  return (
    <div className="mr-5">
      <select
        className="border-dark text-text-dark rounded-sm border bg-transparent py-1 focus:border-dark focus:ring-0 dark:border-darkmode-primary dark:text-white dark:focus:border-darkmode-primary"
        onChange={(event) => {
          const selectedLang = event.target.value;
          const pathWithoutLang = removeCurrentLangPrefix(pathname);

          if (
            selectedLang === default_language &&
            !default_language_in_subdir
          ) {
            window.location.href = removeTrailingSlash(pathWithoutLang);
            return;
          }

          const localizedPath =
            pathWithoutLang === "/"
              ? `/${selectedLang}`
              : `/${selectedLang}${pathWithoutLang}`;

          window.location.href = removeTrailingSlash(localizedPath);
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
