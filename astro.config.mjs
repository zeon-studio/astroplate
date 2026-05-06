import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig, fontProviders } from "astro/config";
import { readFileSync } from "node:fs";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";
import theme from "./src/config/theme.json";

const languages = JSON.parse(
  readFileSync(new URL("./src/config/language.json", import.meta.url), "utf8"),
);

function normalizeSiteUrl(rawUrl) {
  if (!rawUrl) return undefined;

  const withProtocol = /^https?:\/\//.test(rawUrl)
    ? rawUrl
    : `https://${rawUrl}`;

  try {
    const url = new URL(withProtocol);
    return url.hostname === "example.com" ? undefined : url.toString();
  } catch {
    return undefined;
  }
}

const fallbackSiteUrl = "http://localhost:4321/";
const resolvedSiteUrl =
  normalizeSiteUrl(process.env.PUBLIC_SITE_URL) ||
  normalizeSiteUrl(process.env.SITE_URL) ||
  normalizeSiteUrl(process.env.CF_PAGES_URL) ||
  normalizeSiteUrl(config.site.base_url) ||
  fallbackSiteUrl;

const enabledLocales = languages
  .map(({ languageCode }) => languageCode)
  .filter(
    (languageCode) => !config.settings.disable_languages.includes(languageCode),
  );
const enabledLocalePrefixes = enabledLocales.filter(
  (locale) =>
    locale !== config.settings.default_language ||
    config.settings.default_language_in_subdir,
);
const localePrefixPattern = enabledLocalePrefixes.length
  ? `(?:/(?:${enabledLocalePrefixes.join("|")}))?`
  : "";
const legacyArchivePattern = new RegExp(
  `^${localePrefixPattern}/blog(?:/page/\\d+)?/?$`,
);

// Helper to parse font string format: "FontName:wght@400;500;600;700"
function parseFontString(fontStr) {
  const [name, weightPart] = fontStr.split(":");
  let weights = [400]; // default weight

  if (weightPart) {
    // Extract weights from wght@400;500;600 format
    const weightMatch = weightPart.match(/wght@?([\d;]+)/);
    if (weightMatch) {
      weights = weightMatch[1].split(";").map((w) => parseInt(w, 10));
    }
  }

  // remove + from font name and add space
  const cleanName = name.replace(/\+/g, " ");
  return { name: cleanName, weights };
}

// Build fonts configuration from theme.json
const fontsConfig = Object.entries(theme.fonts.font_family)
  .filter(([key]) => !key.includes("_type")) // Filter out type entries
  .map(([key, fontStr]) => {
    const { name, weights } = parseFontString(fontStr);
    const typeKey = `${key}_type`;
    const fallback = theme.fonts.font_family[typeKey] || "sans-serif";

    return {
      name,
      cssVariable: `--font-${key}`,
      provider: fontProviders.google(),
      weights,
      display: "swap",
      fallbacks: [fallback],
    };
  });

// https://astro.build/config
export default defineConfig({
  site: resolvedSiteUrl,
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  i18n: {
    locales: enabledLocales,
    defaultLocale: config.settings.default_language,
    routing: {
      prefixDefaultLocale: config.settings.default_language_in_subdir,
    },
  },
  image: { service: sharp() },
  vite: { plugins: [tailwindcss()] },
  fonts: fontsConfig,
  integrations: [
    react(),
    sitemap({
      filter(page) {
        const pathname = new URL(page, resolvedSiteUrl).pathname;
        return !legacyArchivePattern.test(pathname);
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
});
