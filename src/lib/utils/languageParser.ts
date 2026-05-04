import config from "@/config/config.json";
import languagesJSON from "@/config/language.json";

type LocaleDictionary = {
  main: {
    name: string;
    url: string;
    hasChildren?: boolean;
    children?: { name: string; url: string }[];
  }[];
  footer: { name: string; url: string }[];
  [key: string]: unknown;
};

const { default_language, disable_languages, default_language_in_subdir } =
  config.settings;
const disabledLanguages = disable_languages as string[];

export const enabledLanguages = languagesJSON
  .filter((language) => !disabledLanguages.includes(language.languageCode))
  .sort((a, b) => a.weight - b.weight);

export const supportedLang = default_language_in_subdir
  ? enabledLanguages.map((language) => language.languageCode)
  : [
      "",
      ...enabledLanguages
        .map((language) => language.languageCode)
        .filter((languageCode) => languageCode !== default_language),
    ];

export function normalizeLang(lang?: string) {
  if (!lang || disabledLanguages.includes(lang)) {
    return default_language;
  }

  const language = enabledLanguages.find(
    ({ languageCode }) => languageCode === lang,
  );

  return language?.languageCode || default_language;
}

export function getLanguageByCode(lang?: string) {
  const normalizedLang = normalizeLang(lang);
  return enabledLanguages.find(
    ({ languageCode }) => languageCode === normalizedLang,
  );
}

export function getContentDir(lang?: string) {
  const language = getLanguageByCode(lang);

  if (!language) {
    throw new Error(`Language not found for code "${lang}"`);
  }

  return language.contentDir;
}

export function getLangFromUrl(url: URL) {
  const [, firstSegment] = url.pathname.split("/");
  const language = enabledLanguages.find(
    ({ languageCode }) => languageCode === firstSegment,
  );

  if (!language) {
    return default_language;
  }

  return language.languageCode;
}

export async function getTranslations(lang?: string) {
  const normalizedLang = normalizeLang(lang);

  try {
    const menu = await import(`../../config/menu.${normalizedLang}.json`);
    const dictionary = await import(`../../i18n/${normalizedLang}.json`);
    return {
      ...(menu.default as LocaleDictionary),
      ...(dictionary.default as Record<string, string>),
    };
  } catch {
    const menu = await import(`../../config/menu.${default_language}.json`);
    const dictionary = await import(`../../i18n/${default_language}.json`);
    return {
      ...(menu.default as LocaleDictionary),
      ...(dictionary.default as Record<string, string>),
    };
  }
}

export function slugSelector(url: string, lang?: string) {
  const normalizedLang = normalizeLang(lang);
  const normalizedUrl = url === "/" ? "/" : url.startsWith("/") ? url : `/${url}`;

  let pathname =
    normalizedLang === default_language && !default_language_in_subdir
      ? normalizedUrl
      : normalizedUrl === "/"
        ? `/${normalizedLang}`
        : `/${normalizedLang}${normalizedUrl}`;

  if (config.site.trailing_slash) {
    if (!pathname.endsWith("/")) {
      pathname = `${pathname}/`;
    }
  } else if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
}

export function stripLocaleFromId(id: string) {
  return id.split("/").slice(1).join("/");
}
