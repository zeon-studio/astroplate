# Content Management

This skill explains how to manage content collections within this Astro template architecture.

## Content Architecture

Content is driven by Markdown (`.md`) and MDX (`.mdx`) files located in the `src/content/` directory and managed via the **Astro Content Collections API**.

**Important for AI Agents:** The exact collections (folders) may vary depending on how this template was customized. **You should always list the contents of the `src/content/` directory and read `src/content.config.ts` to discover what collections are available and what their exact schemas are.**

Common examples often found here include:

- **Blog Posts**: `src/content/blog/`
- **Authors**: `src/content/authors/`
- **Pages**: `src/content/pages/`
- **Taxonomies**: E.g., `src/content/categories/`, `src/content/tags/`

## Frontmatter Schema (`content.config.ts`)

Unlike simpler systems, this template enforces strict frontmatter validation using Zod in `src/content.config.ts`. If a markdown file's frontmatter does not match the schema defined in `content.config.ts`, the Astro build will fail.

**Always check `src/content.config.ts` for the exact required fields for a given collection.**

Common fields often include:

- `title`: String. The main title of the post.
- `date`: ISO Date string (e.g., `2022-04-04T05:00:00Z`).
- `description`: String. Short summary used for lists and SEO.
- `image`: String. Path to the cover image (starts with `/images/`).
- `draft`: Boolean (`true`/`false`).

## File Naming Conventions

- Use kebab-case for filenames: `my-new-post.md`
- The filename (without extension) becomes the URL slug (e.g., `/blog/my-new-post`).
- For index pages of a folder, use `_index.md`.

## Image Handling

- Images should be placed in `public/images/`.
- Reference them in frontmatter or content using the absolute path relative to `public`: `/images/my-image.jpg`.
- Example: `![Alt text](/images/my-image.jpg)`

## Common Mistakes / What NOT to do

- **DO NOT** guess frontmatter keys. Read `src/content.config.ts` to know exactly what is required (e.g., whether `author` is required or has a default value).
- **DO NOT** use relative paths for images like `../../public/images/my-image.jpg`. Always use absolute paths starting with `/` (e.g., `/images/...`).
- **DO NOT** put content files outside of `src/content/`. Astro Content Collections strictly parse only this directory.
