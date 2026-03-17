# GEMINI.md - Astroplate Multilingual Project Context

## Project Overview
**Astroplate Multilingual** is a high-performance, SEO-friendly starter template built with **Astro (v6)**, **Tailwind CSS (v4)**, and **TypeScript**. It is designed for content-driven websites with robust multilingual support, a responsive UI, and a pre-configured dark mode.

- **Main Technologies**: Astro, Tailwind CSS, React (for interactive components), MDX, TypeScript.
- **Key Features**:
  - Multilingual support (dynamic routing and content collections).
  - Content Collections for Blogs, Authors, Services, FAQs, etc.
  - Dark mode with a theme switcher.
  - Integrated search functionality.
  - Optimized for deployment on Netlify and Cloudflare Workers.

---

## Building and Running
The project uses `yarn` (or `npm`/`pnpm`) for package management.

- **Install Dependencies**:
  ```bash
  yarn install
  ```
- **Development Mode**:
  Runs a development server with automatic theme and JSON generation.
  ```bash
  yarn run dev
  ```
- **Build for Production**:
  Generates static files in the `dist/` directory.
  ```bash
  yarn run build
  ```
- **Preview Production Build**:
  ```bash
  yarn run preview
  ```
- **Format Code**:
  ```bash
  yarn run format
  ```
- **Cloudflare Workers Deployment**:
  ```bash
  yarn run deploy:cf-workers
  ```

---

## Project Structure & Architecture
- **`src/content/`**: Contains Markdown/MDX files for all content collections, organized by language (e.g., `english/`, `chinese/`).
- **`src/pages/[...lang]/`**: Implements dynamic routing for multilingual support.
- **`src/layouts/`**: Base layouts (`Base.astro`), partials (headers, footers), and shortcodes for MDX.
- **`src/config/`**:
  - `config.json`: Core site settings (title, metadata, pagination).
  - `language.json`: Configures supported languages and display names.
  - `theme.json`: Defines fonts, colors, and styling parameters.
- **`src/lib/`**: Utility functions for content parsing, taxonomy handling, and language processing.
- **`scripts/`**:
  - `themeGenerator.js`: Dynamically generates `src/styles/generated-theme.css` based on `theme.json`.
  - `jsonGenerator.js`: Pre-processes content metadata into JSON for faster access.

---

## Development Conventions
1. **Content First**: All page content (except for complex interactive parts) should be managed via Markdown/MDX in `src/content/`.
2. **Multilingual Management**:
   - New languages must be added to `src/config/language.json`.
   - Content must follow the structure: `src/content/{collection}/{language}/{slug}.md`.
3. **Styling**: Use Tailwind CSS utility classes. Avoid writing custom CSS unless necessary; if needed, add to `src/styles/main.css` or component-specific `<style>` tags.
4. **Components**:
   - Use **Astro components** (`.astro`) for static UI.
   - Use **React components** (`.tsx`) only when client-side interactivity is required (e.g., Search, Theme Switcher).
5. **Shortcodes**: Reusable UI elements in MDX are located in `src/layouts/shortcodes/`.

---

## Key Files Summary
- `astro.config.mjs`: Central configuration for Astro integrations and i18n.
- `src/content.config.ts`: Defines Zod schemas and loaders for all content collections.
- `package.json`: Project scripts, dependencies, and metadata.
- `tsconfig.json`: TypeScript configuration with path aliases (e.g., `@/` maps to `src/`).
- `wrangler.jsonc`: Configuration for Cloudflare Workers deployment.
