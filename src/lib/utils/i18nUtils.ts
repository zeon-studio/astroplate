import config from "@/config/config.json";
import languagesJSON from "@/config/language.json";
import fs from "fs";
import path from "path";
const { defaultLang } = config.language;

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
  return defaultLang;
}

export const getTranslations = async (lang: string) => {
  const menu = await import(`../../config/menu.${lang || defaultLang}.json`);
  const dictionary = await import(`../../i18n/${lang || defaultLang}.json`);
  return { ...menu, ...dictionary };
};

export const supportedLang = [""].concat(
  languagesJSON.map((lang) => lang.languageCode),
);
