import enDataJSON from './en.json';
import frDataJSON from './fr.json';
import arDataJSON from './ar.json';


interface TranslationItem {
  id: string;
  translation: string;
}

export function convertJsonToUiObject(jsonData: TranslationItem[], language: string): Record<string, Record<string, string>> {
  const ui: Record<string, Record<string, string>> = {};
  ui[language] = {};

  for (const item of jsonData) {
    ui[language][item.id] = item.translation;
  }

  return ui;
}


export const ui = {
  ...convertJsonToUiObject(enDataJSON, 'en'),
  ...convertJsonToUiObject(frDataJSON, 'fr'),
  ...convertJsonToUiObject(arDataJSON, 'ar')
} as const;


// import { readdirSync } from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// interface TranslationItem {
//   id: string;
//   translation: string;
// }

// function convertJsonToUiObject(jsonData: TranslationItem[]): Record<string, string> {
//   const ui: Record<string, string> = {};

//   for (const item of jsonData) {
//     ui[item.id] = item.translation;
//   }

//   return ui;
// }

// const __filename = fileURLToPath(import.meta.url);
// const i18nFolderPath = path.join(path.dirname(__filename));
// const ui: Record<string, Record<string, string>> = {};

// readdirSync(i18nFolderPath).forEach((file) => {
//   if (file.endsWith('.json')) {
//     const language = file.split('.')[0];
//     import(path.join(i18nFolderPath, file)).then((module) => {
//       const jsonData: TranslationItem[] = module.default;
//       ui[language] = convertJsonToUiObject(jsonData);
//     });
//   }
// });

// export { ui };