import config from "@/config/config.json";
import languagesJSON from "@/config/language.json";
import { getRelativeLocaleUrl } from "astro:i18n";
const { default_language } = config.settings;

const locales: { [key: string]: any } = {};

// Load menu and dictionary dynamically
languagesJSON.forEach((language) => {
  const { languageCode } = language;
  import(`../../config/menu.${languageCode}.json`).then((menu) => {
    import(`../../i18n/${languageCode}.json`).then((dictionary) => {
      locales[languageCode] = { ...menu, ...dictionary };
    });
  });
});

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

// export const getTranslations = async (lang: string) => {
//   const menu = await import(
//     `../../config/menu.${lang || default_language}.json`
//   );
//   const dictionary = await import(
//     `../../i18n/${lang || default_language}.json`
//   );
//   return { ...menu, ...dictionary };
// };

// export const supportedLang = [""].concat(
//   languagesJSON.map((lang) => lang.languageCode),
// );
// Function to construct the URL based on trailing_slash value

export const getTranslations = async (lang: string) => {
  const {
    default_language,
    disable_languages,
  }: { default_language: string; disable_languages: string[] } =
    config.settings;

  if (disable_languages.includes(lang)) {
    lang = default_language;
  }

  let language = languagesJSON.find((l) => l.languageCode === lang);

  if (!language) {
    lang = default_language;
    language = languagesJSON.find((l) => l.languageCode === default_language);
  }

  if (!language) {
    throw new Error("Default language not found");
  }

  const contentDir = language.contentDir;

  let menu, dictionary;
  try {
    menu = await import(`../../config/menu.${lang}.json`);
    dictionary = await import(`../../i18n/${lang}.json`);
  } catch (error) {
    menu = await import(`../../config/menu.${default_language}.json`);
    dictionary = await import(`../../i18n/${default_language}.json`);
  }

  return { ...menu.default, ...dictionary.default, contentDir };
};

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

const supportedLang = ["", ...languagesJSON.map((lang) => lang.languageCode)];
const disabledLanguages = config.settings.disable_languages as string[];

// Filter out disabled languages from supportedLang
const filteredSupportedLang = supportedLang.filter(
  (lang) => !disabledLanguages.includes(lang),
);

export { filteredSupportedLang as supportedLang };
