import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginAstro.configs.all,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],
    rules: {
      "astro/no-set-html-directive": "off",
      "astro/semi": "off",
      "astro/no-unused-css-selector": "off",
      "astro/prefer-class-list-directive": "off",
      "astro/prefer-object-class-list": "off",
      "astro/jsx-a11y/anchor-is-valid": "off",
      "astro/no-deprecated-astro-resolve": "off",
      "astro/no-unused-define-vars-in-style": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "astro/jsx-a11y/click-events-have-key-events": "off",
      "astro/jsx-a11y/no-noninteractive-element-interactions": "off",
      "astro/jsx-a11y/alt-text": "off",
      "astro/jsx-a11y/no-static-element-interactions": "off",
      "astro/jsx-a11y/iframe-has-title": "off",
      "astro/no-conflict-set-directives": "off",
      "astro/no-deprecated-get-entry-by-slug": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "jsx-a11y/heading-has-content": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "astro/jsx-a11y/no-redundant-roles": "off",
      "jsx-a11y/no-redundant-roles": "off",
      "astro/jsx-a11y/control-has-associated-label": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "astro/no-unsafe-inline-scripts": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "jsx-a11y/media-has-caption": "off",
      "astro/no-exports-from-components": "off",
    },
  },
  {
    ignores: [
      "scripts/*",
      "src/tailwind-plugin/*",
      "src/layouts/helpers/Announcement.tsx",
      "src/layouts/partials/Header.astro",
      "src/layouts/shortcodes/Tabs.tsx",
      "src/layouts/shortcodes/Video.tsx",
      "src/layouts/shortcodes/Youtube.tsx",
    ],
  },
);
