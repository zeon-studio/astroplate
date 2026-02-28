import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import remarkMath from "remark-math"; // md support math
import rehypeKatex from "rehype-katex"; // md support math
import sharp from "sharp";
import config from "./src/config/config.json";
import languagesJSON from "./src/config/language.json";

const { default_language } = config.settings;

const supportedLang = [...languagesJSON.map((lang) => lang.languageCode)];
const disabledLanguages = config.settings.disable_languages;

// Filter out disabled languages from supportedLang
const filteredSupportedLang = supportedLang.filter(
  (lang) => !disabledLanguages.includes(lang),
);

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "ignore",
  vite: { plugins: [tailwindcss()] },
  i18n: { locales: filteredSupportedLang, defaultLocale: default_language },
  image: { service: sharp() },
  integrations: [
    react(),
    sitemap(),
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
    icon({
      include: {
        ph: ["*"],
        devicon: ["*"],
      }
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc, 
      remarkMath, // md support math
      [remarkCollapse, { test: "Table of contents" }]
    ],
    rehypePlugins: [
      rehypeKatex // md support math
    ],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },
});
