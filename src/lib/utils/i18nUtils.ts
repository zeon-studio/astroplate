import fs from 'fs';
import path from 'path';

const menusFolderPath = './src/config';

const locales = fs.readdirSync(menusFolderPath)
  .filter(file => /^menu\.[a-z]{2}\.json$/.test(file))
  .map(file => {
    const filePath = path.join(menusFolderPath, file);
    const localeName = file.split('.')[1]; // Extract language code from file name
    const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return { [localeName]: localeData };
  })
  .reduce((accumulator, locale) => {
    return { ...accumulator, ...locale };
  }, {});

// Extract all languages from the locales object
const languages = Object.keys(locales);

// Export the locales and languages
export { locales, languages };

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  if (locales.hasOwnProperty(lang)) {
    return lang;
  }
  return 'en';
}



// import { ui } from '@/i18n/ui';
// import config from "@/config/config.json";
// const {defaultLang}: {defaultLang : keyof typeof ui} = config.language as any;

// export function useTranslations(lang: keyof typeof ui) {
//   return function t(key: keyof typeof ui[typeof defaultLang]) {
//     return ui[lang][key] || ui[defaultLang][key];
//   }
// }

import { ui } from '@/i18n/ui';
import config from "@/config/config.json";

const { defaultLang }: { defaultLang: keyof typeof ui } = config.language as any;

export function useTranslations(lang?: keyof typeof ui) {
  const activeLang = lang || defaultLang;

  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const translation = ui[activeLang][key];

    // If not found, fall back to the default language
    if (translation) {
      return translation;
    } else {
      return ui[defaultLang][key];
    }
  };
}
