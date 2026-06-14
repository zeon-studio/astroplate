# Internationalization (i18n) Guidance

This guidance outlines the multi-language (i18n) architecture for our templates. 

**If the template already has i18n configured:** You must follow these established patterns to ensure consistency and prevent hallucinating translations for user-facing text, page routing, or layout structure.

**If the template DOES NOT support i18n yet (starting from scratch):** If the user requests to add multi-language support, you MUST set it up following this exact structural pattern. Do not invent a new i18n architecture; use the configuration and utilities described here.

## 1. Supported Languages Configuration

The available languages are configured in `src/config/language.json`. Each object defines:
- `languageName`: Display name (e.g., "En", "Fr").
- `languageCode`: Code used in URLs, filenames, and logic (e.g., "en", "fr").
- `contentDir`: The specific content folder used for this language's Markdown/MDX files.
- `weight`: Used for ordering languages.

Core settings for i18n are stored in `src/config/config.json` under `settings`:
- `default_language`: The fallback and primary language code.
- `disable_languages`: An array of languages to disable temporarily.
- `default_language_in_subdir`: Whether the default language should prefix its URLs with the language code (e.g., `/en/`).

## 2. Translations & Navigation

Translations are split into two files per language code (`{lang}`):

- **Dictionary (`src/i18n/{lang}.json`)**: Stores general UI texts, buttons, placeholders, error messages, and labels.
- **Menu (`src/config/menu.{lang}.json`)**: Configures the primary header and footer navigation arrays.

**Critical Rule**: Never hardcode English strings in Astro pages, React components, or anywhere in the UI. Always add the translation key to **all** `src/i18n/{lang}.json` files and reference the key dynamically.

## 3. The Language Parser Utility

The core logic for i18n is located in `src/lib/utils/languageParser.ts`. It provides several important functions and variables you must use:

- `getTranslations(lang: string)`: Asynchronously loads and merges the dictionary and menu JSON files for the requested language. If the language is disabled or missing, it falls back to the default language. It also returns the `contentDir` for the language.
- `getLangFromUrl(url: URL)`: Extracts the active language code from the current Astro URL.
- `slugSelector(url: string, lang: string)`: Constructs a localized path string, considering trailing slashes and the `default_language_in_subdir` setting. Use this helper for all internal `<a>` links.
- `supportedLang` / `languages`: Exported arrays containing the available language codes.

## 4. Usage Example in Astro Pages

When working within an `.astro` page or layout, fetch the language and translations at the top of the component script block:

```astro
---
import { getTranslations, getLangFromUrl, slugSelector } from "@/lib/utils/languageParser";

// 1. Get the current language from the URL
const lang = getLangFromUrl(Astro.url);

// 2. Fetch all translations
const { read_more, submit, contentDir } = await getTranslations(lang);
---

<!-- 3. Use translations and generate localized links -->
<a href={slugSelector('/about', lang)}>{read_more}</a>
<button>{submit}</button>
```

## 5. Adding i18n from Scratch (If Not Configured)

If you are instructed to add multi-language support to a template that doesn't have it, you must implement the architecture exactly as defined above. Here is the checklist of missing pieces you need to create:

1.  **Create Configuration Files**:
    -   Create `src/config/language.json` as an array of language objects (`languageName`, `languageCode`, `contentDir`, `weight`).
    -   Add `default_language`, `disable_languages`, and `default_language_in_subdir` to `src/config/config.json` under `settings`.
2.  **Setup Dictionary & Menu Files**:
    -   Create `src/i18n/{lang}.json` for your default and target languages.
    -   Create (or split existing menus into) `src/config/menu.{lang}.json`.
3.  **Implement the Language Parser Utility**:
    -   Create `src/lib/utils/languageParser.ts`. You **MUST** use the exact implementation provided below to ensure compatibility with our architecture.
    <details>
    <summary>Click to view `languageParser.ts` implementation</summary>

    ```typescript
    import config from "../../config/config.json";
    import languagesJSON from "../../config/language.json";
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

    const languages = Object.keys(locales);
    export { languages, locales };

    export function getLangFromUrl(url: URL): string {
      const [, lang] = url.pathname.split("/");
      if (locales.hasOwnProperty(lang)) {
        return lang;
      }
      return default_language;
    }

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

    const supportedLang = ["", ...languagesJSON.map((lang) => lang.languageCode)];
    const disabledLanguages = config.settings.disable_languages as string[];

    const filteredSupportedLang = supportedLang.filter(
      (lang) => !disabledLanguages.includes(lang),
    );

    export { filteredSupportedLang as supportedLang };

    export const slugSelector = (url: string, lang: string) => {
      const { default_language, default_language_in_subdir } = config.settings;
      const { trailing_slash } = config.site;

      let constructedUrl;

      if (url === "/") {
        constructedUrl = lang === default_language ? "/" : `/${lang}`;
      } else {
        if (lang === default_language) {
          constructedUrl = url.startsWith("/") ? url : `/${url}`;
        } else {
          constructedUrl = url.startsWith("/")
            ? `/${lang}${url}`
            : `/${lang}/${url}`;
        }
      }

      if (lang === default_language && default_language_in_subdir) {
        constructedUrl = `/${lang}${constructedUrl}`;
      }

      if (trailing_slash) {
        if (!constructedUrl.endsWith("/")) {
          constructedUrl += "/";
        }
      } else {
        if (constructedUrl.endsWith("/") && constructedUrl !== "/") {
          constructedUrl = constructedUrl.slice(0, -1);
        }
      }

      return constructedUrl;
    };
    ```
    </details>
4.  **Configure Astro (`astro.config.mjs`)**:
    -   Import `language.json` and `config.json` in `astro.config.mjs`.
    -   Configure Astro's native i18n routing using the imported data: `i18n: { locales: filteredSupportedLang, defaultLocale: default_language }`.
5.  **Refactor Existing Pages & Layouts**:
    -   Move static pages inside `[lang]` directories if dynamic routing is needed, or update paths accordingly.
    -   Replace all hardcoded English strings with dynamic dictionary lookups via `getTranslations`.
    -   Wrap all internal `<a>` tags with the `slugSelector(path, lang)` helper.
6.  **Setup Content Collections**:
    -   Organize markdown/MDX content under language-specific directories corresponding to `contentDir` (e.g., `src/content/blog/en/`, `src/content/blog/fr/`).
