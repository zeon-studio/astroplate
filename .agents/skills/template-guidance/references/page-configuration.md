# Page and Site Configuration

This skill explains how to configure global settings, navigation, social links, and SEO metadata in this Astro template.

## Global Configuration Files

The primary configuration files are located in `src/config/`. These are JSON files that control various aspects of the site.

**Important for AI Agents:** The exact schema and available keys in these JSON files may vary. **Always read the contents of the files in `src/config/` (e.g. `config.json`, `menu.json`) to discover what settings are currently available.**

Common examples often found here include:

### `src/config/config.json`

This is the master configuration file for the site.

- **`site`**: Contains basic site info like `title`, `base_url`, `favicon`, `logo` paths, and logo dimensions.
- **`settings`**: Controls feature flags like `search`, `sticky_header`, `theme_switcher`, `default_theme` (dark/light), and `pagination` limits.
- **`params`**: Contains global parameters like `contact_form_action` and `copyright` text.
- **`metadata`**: Global SEO defaults (`meta_author`, `meta_image`, `meta_description`).
- **`llms`**: Configuration for generating LLM-friendly text files (e.g., `llms.txt`).

### `src/config/menu.json`

Controls the header and footer navigation menus.

- **`main`**: Array of objects for the header menu (`name`, `url`). Supports nested menus.
- **`footer`**: Array of objects for footer links.

### `src/config/social.json`

Contains links to social media profiles. Used by the Social component.

- Keys include `facebook`, `twitter`, `instagram`, `github`, `linkedin`, etc.
- Set the value to a valid URL or leave it empty to hide the icon.

### `src/config/theme.json`

Controls the colors and fonts. (See the `styling-and-theming` skill for detailed instructions).

## SEO Metadata

SEO is handled dynamically, with fallbacks:

1. **Per-Page Basis**: Defined in the frontmatter of individual markdown files (`title`, `meta_title`, `description`, `image`).
2. **Global Fallback**: If a specific page lacks SEO fields, the system falls back to `config.json` -> `metadata`.

The `<SeoMeta />` component orchestrates this metadata injection into the `<head>`.

## Common Mistakes / What NOT to do

- **DO NOT** delete keys from `config.json` or `menu.json` unless you are sure the code doesn't depend on them. If you want to disable a feature, check if there is an `enable: false` toggle instead.
- **DO NOT** hardcode navigation links directly into header or footer components. Always use `menu.json` to keep configuration centralized.
- **DO NOT** use relative paths for `base_url` in `config.json`. It must be a fully qualified URL (e.g., `https://yourdomain.com`).
