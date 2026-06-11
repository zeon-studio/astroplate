# Internationalization (i18n) Guidance

This template natively supports multi-language (i18n) features. When working on any functionality that involves user-facing text, page routing, or layout structure, you must follow these established patterns to ensure consistency and prevent hallucinating translations.

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
