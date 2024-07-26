import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'




// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: squooshImageService()
  },
  integrations: [react(), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), AutoImport({
    imports: ["@/shortcodes/Button", 
      "@/shortcodes/Accordion",
       "@/shortcodes/Notice",
        "@/shortcodes/Video",
         "@/shortcodes/Youtube",
          "@/shortcodes/Tabs", 
          "@/shortcodes/Tab",

    ]
  }), expressiveCode({
    plugins: [pluginLineNumbers(),pluginCollapsibleSections()],
}
),  mdx()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    server: {
      watch: {
        ignored: [
          "**/.direnv/**/*",
          "**/node_modules/**/*",
          "**/.git/**/*",
        ],
      },
    },
  },
});