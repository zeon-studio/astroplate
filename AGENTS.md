# AGENTS.md - Astroplate Development Guide

## Overview

Astroplate is an Astro-based multilingual blog/website starter using React, Tailwind CSS, and TypeScript. This file provides guidelines for agentic coding agents working in this repository.

---

## Build, Lint, and Test Commands

### Development
```bash
yarn dev              # Start dev server with theme & JSON generators in watch mode
```

### Building
```bash
yarn build            # Generate theme, JSON, then build Astro site
yarn preview          # Preview the built production site
```

### Code Quality
```bash
yarn format           # Format all source files with Prettier
yarn check            # Run Astro type checking (TypeScript + Astro)
```

### Scripts (Utilities)
```bash
yarn generate-json    # Run JSON generator script only
yarn remove-darkmode  # Remove dark mode support
yarn remove-multilang # Remove multilingual support
```

### Cloud Deployment
```bash
yarn deploy:cf-workers   # Build and deploy to Cloudflare Workers
yarn preview:cf-workers  # Build and preview with Wrangler
```

**Note:** This project has no test suite configured. Do not add tests.

---

## Code Style Guidelines

### General Conventions

- **Indentation:** 2 spaces (enforced by `.editorconfig`)
- **Line endings:** LF (Unix)
- **Charset:** UTF-8
- **Trailing whitespace:** Trimmed (except in `.md` files)
- **Final newline:** Required

### Formatting

- Use **Prettier** for all code formatting
- Run `yarn format` before committing
- Prettier plugins used:
  - `prettier-plugin-astro` - For `.astro` files
  - `prettier-plugin-tailwindcss` - For Tailwind class sorting

### TypeScript

- Uses strict mode via `astro/tsconfigs/strict`
- Always define types for function parameters and return values
- Use TypeScript's strict null checks
- Path aliases are configured in `tsconfig.json`:
  - `@/components/*` → `./src/layouts/components/*`
  - `@/shortcodes/*` → `./src/layouts/shortcodes/*`
  - `@/helpers/*` → `./src/layouts/helpers/*`
  - `@/partials/*` → `./src/layouts/partials/*`
  - `@/*` → `./src/*`

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Astro components | PascalCase | `Header.astro`, `Logo.astro` |
| React components | PascalCase | `Button.tsx`, `Tabs.tsx` |
| TypeScript utilities | camelCase | `dateFormat.ts`, `languageParser.ts` |
| Config files | kebab-case | `config.json`, `theme.json` |

### Astro Components (`.astro`)

- Frontmatter fenced with `---` at the top
- Import sorting: external first, then internal
- Use type-only exports for component props:

```astro
---
export interface Props {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
  lang?: string;
}

const { title, meta_title, description } = Astro.props;
---

<html>
  <!-- template -->
</html>
```

### React Components (`.tsx`)

- Use functional components with explicit prop types
- Import React when needed (often not required in Astro context)
- Use `client:load` or `client:visible` directive when embedding in Astro

```tsx
interface ButtonProps {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}

const Button = ({ label, link, style, rel }: ButtonProps) => {
  return <a href={link}>{label}</a>;
};

export default Button;
```

### Content Collections

- Define schemas in `src/content.config.ts` using Astro Content Collections
- Use Zod for schema validation
- Collections defined: `blog`, `authors`, `pages`, `about`, `contact`, `homepage`, `ctaSection`, `testimonialSection`

### Imports

- Use path aliases (`@/...`) instead of relative paths where possible
- Group imports: external libraries → internal modules → styles
- Astro built-in imports: `astro:assets`, `astro:content`, `astro:transitions`

```astro
---
import React from "react";
import { format } from "date-fns";
import Logo from "@/components/Logo.astro";
import config from "@/config/config.json";
import "@/styles/main.css";
---
```

### Error Handling

- Use try/catch for async operations
- Return sensible defaults where appropriate
- Log errors appropriately for debugging

### CSS and Styling

- Use **Tailwind CSS v4** for styling
- Tailwind configured via `@tailwindcss/vite` plugin
- Use utility classes in templates
- Custom styles go in `src/styles/`

### Markdown/MDX

- Content lives in `src/content/` directory
- Use `.md` for simple content, `.mdx` for interactive components
- Markdown linting: `.markdownlint.json` disables MD013 (line length) and MD033 (inline HTML)

---

## Project Structure

```
src/
├── components/      # Reusable Astro components
├── config/          # JSON configuration files
├── content/         # Markdown/MDX content (blog, pages, authors, etc.)
├── hooks/           # React hooks (useTheme)
├── i18n/            # Translation JSON files
├── layouts/         # Page layouts and shortcodes
│   ├── components/  # UI components
│   ├── helpers/     # Helper components (Search, Language, etc.)
│   ├── partials/    # Page partials (Header, Footer, etc.)
│   └── shortcodes/  # Shortcode components
├── lib/             # Utility functions
│   └── utils/       # TypeScript utilities
├── pages/           # Astro pages and routes
├── styles/          # CSS files
└── types/           # TypeScript type definitions
```

---

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration, integrations, i18n |
| `tsconfig.json` | TypeScript configuration with strict mode |
| `.prettierrc` | Prettier formatting rules |
| `.editorconfig` | Editor settings (2-space indent, LF, UTF-8) |
| `.markdownlint.json` | Markdown linting rules |

---

## Working with Multilingual Support

- Languages defined in `src/config/language.json`
- Default language in `src/config/config.json`
- Routes use `[...lang]` catch-all parameter
- Use `languageParser.ts` utilities for language-aware routing:
  - `getLangFromUrl(Astro.url)` - Extract language from URL
  - `getTranslations(lang)` - Get translated menu/content
  - `slugSelector(url, lang)` - Apply language prefix to URLs
