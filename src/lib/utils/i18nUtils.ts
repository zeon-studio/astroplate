import config from "@/config/config.json";
import languagesJSON from "@/config/language.json";
import { getRelativeLocaleUrl } from "astro:i18n";
import fs from "fs";
import path from "path";
const { default_language } = config.settings;

const menusFolderPath = "./src/config";

const locales = fs
  .readdirSync(menusFolderPath)
  .filter((file) => /^menu\.[a-z]{2}\.json$/.test(file))
  .map((file) => {
    const filePath = path.join(menusFolderPath, file);
    const localeName = file.split(".")[1]; // Extract language code from file name
    const localeData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return { [localeName]: localeData };
  })
  .reduce((accumulator, locale) => {
    return { ...accumulator, ...locale };
  }, {});

// Extract all languages from the locales object
const languages = Object.keys(locales);

// Export the locales and languages
export { languages, locales };

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split("/");
  if (locales.hasOwnProperty(lang)) {
    return lang;
  }
  return default_language;
}

export const getTranslations = async (lang: string) => {
  const menu = await import(
    `../../config/menu.${lang || default_language}.json`
  );
  const dictionary = await import(
    `../../i18n/${lang || default_language}.json`
  );
  return { ...menu, ...dictionary };
};

export const supportedLang = [""].concat(
  languagesJSON.map((lang) => lang.languageCode),
);

// Function to construct the URL based on trailing_slash value
export const constructUrl = (
  url: string,
  lang: string,
  default_language: string,
  trailing_slash: boolean,
) => {
  let constructedUrl;
  if (url === "/") {
    constructedUrl = lang === default_language ? "/" : `/${lang}`;
  } else {
    constructedUrl = getRelativeLocaleUrl(lang, url, {
      normalizeLocale: false,
    });
  }
  if (trailing_slash) {
    if (!constructedUrl.endsWith("/")) {
      constructedUrl += "/";
    }
  } else {
    if (constructedUrl.endsWith("/")) {
      constructedUrl = constructedUrl.slice(0, -1);
    }
  }

  // Ensure home URL is absolute
  if (constructedUrl === "") {
    constructedUrl = "/";
  }

  return constructedUrl;
};
