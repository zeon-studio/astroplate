# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, split by Astro pages (`src/pages`), React/utility components (`src/components`), layouts, and data helpers. Global config (Tailwind, Astro, ESLint) sits under `config/` and root dotfiles. Static assets and SEO artifacts are stored in `public/`, while generated JSON helpers reside in `scripts/` alongside `jsonGenerator.js` and `removeDarkmode.js`. Content updates generally flow `content → scripts → src/pages`, so keep script outputs in sync before committing.

## Build, Test, and Development Commands
- `yarn dev`: runs `scripts/jsonGenerator.js` and starts `astro dev` with hot reload.
- `yarn build`: regenerates JSON, compiles Astro/Vite for production, and emits to `dist/`.
- `yarn preview`: serves the latest build for manual QA.
- `yarn check`: Astro’s type and config validation; run before PRs to catch schema issues.
- `yarn lint` / `yarn format`: eslint (Astro + TS + React) and prettier format pass; both respect Tailwind class sorting.

## Coding Style & Naming Conventions
Codebase is TypeScript-first with ES modules. Prefer functional React components, `PascalCase` filenames for components/layouts, and kebab-case for routes and assets. Use 2-space indentation and keep Tailwind classes ordered by semantics (prettier-plugin-tailwindcss handles this). Run Prettier after structural edits and ESLint after logic changes; both are configured via `eslint.config.js` and `prettier` plugins in `package.json`.

## Testing Guidelines
There is no dedicated automated test suite yet; rely on `yarn check`, `yarn lint`, and manual preview. When adding tests, co-locate them next to the feature (e.g., `Component.test.ts`) and ensure fixtures stay within `src/tests` or the feature folder. Document new test commands in `package.json` and update this guide accordingly.

## Commit & Pull Request Guidelines
Commits favor short, imperative messages (`fix bug`, `feat: add eslint and nvm configuration`). Prefix with conventional tags (`feat`, `fix`, `chore`) when scope is clear, and keep one logical change per commit. PRs should describe the problem, the approach, include screenshots for visual tweaks, and link Jira/GitHub issues. Confirm `yarn build`, `yarn lint`, and `yarn check` pass locally, and mention any data regeneration steps (`yarn generate-json`) in the PR notes.

## Security & Configuration Tips
Never commit `.env` or analytics keys; reference `astro.config.mjs` and GTM setup for required environment variables. Json generators may embed external data—validate inputs before updating scripts. Review Netlify settings (`netlify.toml`) when altering redirects or headers to avoid leaking draft routes.
