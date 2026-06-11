# Script Usage

This skill explains the custom Node.js scripts and `pnpm` commands available in this Astro template ecosystem.

## Available pnpm Commands (`package.json`)

### `pnpm dev`

Starts the local development server.

- **What it does**: Concurrently runs `astro dev` alongside watch scripts. It executes `themeGenerator.js --watch` to hot-reload CSS changes when `theme.json` is modified, and runs `jsonGenerator.js` to ensure the search index is up-to-date.

### `pnpm build`

Compiles the application for production.

- **What it does**: Sequentially runs `themeGenerator.js` and `jsonGenerator.js` to ensure all generated assets are ready _before_ triggering the `astro build` command, followed by `llmsGenerator.js`.

### `pnpm check`

Runs Astro's TypeScript checker.

- **What it does**: Validates types across the project, including frontmatter types derived from `content.config.ts`.

### `pnpm remove-darkmode`

A utility script to strip dark mode capabilities from the template.

- **What it does**: Runs `scripts/removeDarkmode.js` and formats the code.

## The `scripts/` Directory

The custom logic is housed in the `scripts/` folder.

- **`themeGenerator.js`**: Reads `src/config/theme.json` and outputs CSS variables into `src/styles/generated-theme.css`. Must never be bypassed.
- **`jsonGenerator.js`**: Scans the markdown content (defined in `config.json` -> `settings.searchable_folders`) and compiles it into a `search.json` file used by the search component.
- **`llmsGenerator.js`**: Reads the output HTML (or markdown) and generates standard `llms.txt` files for AI ingestion, adhering to the configuration in `config.json` -> `llms`.

## Common Mistakes / What NOT to do

- **DO NOT** run standard Astro commands like `npx astro dev` directly. Doing so bypasses the theme and JSON generation scripts, resulting in broken CSS variables and non-functional search. Always use `pnpm dev`.
- **DO NOT** manually edit the output files of these scripts (e.g., `search.json`, `generated-theme.css`, `llms.txt`). They will be overwritten on the next run. Edit the source content or configuration files instead.
