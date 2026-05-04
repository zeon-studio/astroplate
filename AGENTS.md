# AGENTS.md

## Project Overview

- This repository is a locally customized fork of the Astroplate starter.
- Treat it as an Astro 6 + Tailwind 4 + TypeScript project with optional React islands.
- The primary workflow is defined in `package.json` and supported by custom generator scripts in `scripts/`.

## Working Conventions

- Prefer small, targeted edits that preserve the current project structure.
- Preserve the custom generator pipeline unless a task explicitly asks to redesign it.
- Do not replace the current script chain with a simplified Astro-only workflow without explicit approval.
- Before changing build or content behavior, inspect the relevant scripts in `scripts/` to understand generated output and side effects.

## Default Commands

- Use `npm` as the default package manager for this repository.
- Install dependencies with `npm install`.
- Start local development with `npm run dev`.
- Run static/project checks with `npm run check`.
- Build the site with `npm run build`.
- Preview Cloudflare Workers output with `npm run preview:cf-workers`.
- Deploy to Cloudflare Workers with `npm run deploy:cf-workers`.
- Prefer `npx` for one-off tooling when needed.

## Workflow Notes

- `npm run dev` runs `themeGenerator.js` in watch mode and runs `jsonGenerator.js` before starting `astro dev`.
- `npm run build` runs `themeGenerator.js`, then `jsonGenerator.js`, then `astro build`, then `llmsGenerator.js`.
- Changes to theme, JSON generation, or build output may affect downstream generated artifacts. Review the corresponding script before editing related behavior.
- Blog posts are authored directly in `src/content/blog/<language>` as Markdown `.md` files.
- English posts live in `src/content/blog/english/` and Polish posts live in `src/content/blog/polish/`.
- Post URLs come from filenames. For example, `src/content/blog/english/my-post.md` becomes `/blog/my-post`, and `src/content/blog/polish/my-post.md` becomes `/pl/blog/my-post`.
- Use `src/content/blog/english/-template.md` or `src/content/blog/polish/-template.md` as the starting point for new posts.
- Blog post frontmatter should include only `title`, `description`, `date`, `image`, `categories`, `tags`, and `draft`.
- Keep post images in `public/images/` and reference them with absolute paths like `/images/cover.png`.
- Use `draft: true` for unpublished work. Draft posts should stay out of routes, search JSON, and sitemap output.

## Package Manager Policy

- Use `npm` for all install and run instructions in this repo.
- Treat `yarn` references as historical leftovers unless a task explicitly asks to preserve them.
- When touching package-manager-related files, normalize toward npm unless there is a concrete reason not to.
- Avoid unnecessary lockfile churn unless the task is explicitly about dependencies or package-manager migration.

## Known Inconsistencies

- `package.json` still declares `"packageManager": "yarn@1.22.22"`.
- The `remove-darkmode` script still calls `yarn format`.
- `readme.md`, `netlify.toml`, and some generated/help text still mention `yarn`.
- Both `package-lock.json` and `yarn.lock` are present in the repo today.

## Preferred Cleanup Direction

- If a task touches docs, scripts, or deployment config, check for lingering `yarn` assumptions and update them to npm syntax where appropriate.
- Prefer incremental cleanup over a broad package-manager rewrite unless the task specifically calls for a full migration pass.
- Keep the generator and deployment behavior intact while normalizing package-manager usage.
