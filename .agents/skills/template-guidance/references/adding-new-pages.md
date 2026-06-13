# Adding New Pages

This skill explains how to add new pages utilizing Astro's file-based routing combined with this template's custom Markdown architecture.

## How Routing Works

This project uses **Astro's file-based router** located in `src/pages/`.
There are two main ways to add a page.

### Method 1: Adding a Markdown-Driven Page (Recommended)

If the page is mainly text and images (like an "About" or "Privacy Policy" page):

**Important for AI Agents:** Check which folder represents standard standalone pages (often `src/content/pages/` or similar) before creating the file.

1. **Create the Content File**: Create a new markdown file in `src/content/pages/` (e.g., `src/content/pages/my-new-page.md`).
2. **Add Frontmatter**:
   ```yaml
   ---
   title: "My New Page"
   meta_title: "SEO Title Here"
   description: "Description of the new page"
   draft: false
   ---
   Your markdown content goes here.
   ```
3. **Using Shortcodes**: Before using any shortcodes or custom components in your markdown, you **must** read and review the available shortcodes in the `src/layouts/shortcodes` directory to avoid MDX errors.
4. **How it renders**: The file `src/pages/[regular].astro` acts as a catch-all route for pages defined in the `pages` content collection. It automatically reads the markdown file, passes it to the `Base.astro` layout, and renders the content using Astro's `<Content />` component.

### Method 2: Adding a Custom Astro Page

If the page requires custom layout structures, heavy data fetching, or multiple distinct React islands:

**Important for AI Agents:** When creating a custom page, you **must analyze existing custom pages** in `src/pages/` to follow the current design system.

- **Do not guess** the layout structure or component usage.
- Examine how existing pages implement page headers, wrappers, and specific UI elements, and mimic their structure.

1. **Create the `.astro` file**: Create a file directly in `src/pages/` (e.g., `src/pages/my-custom-page.astro`).
2. **Structure the Page**: Use the `Base.astro` component to wrap your page so it inherits the header, footer, and SEO.

   ```astro
   ---
   import Base from "@/layouts/Base.astro";
   import PageHeader from "@/partials/PageHeader.astro";

   const title = "My Custom Page";
   ---

   <Base title={title} description="Custom description">
     <PageHeader title={title} />
     <section class="section">
       <div class="container">
         <p>Custom Astro code goes here.</p>
       </div>
     </section>
   </Base>
   ```

3. **Add to Navigation**: To make the page visible in the header, edit `src/config/menu.json` and add an object to the `main` array:
   ```json
   {
     "name": "My Custom Page",
     "url": "/my-custom-page"
   }
   ```

## Common Mistakes / What NOT to do

- **DO NOT** create a `page.tsx` file for routing. This is not Next.js App Router. Pages must be `.astro` files located in `src/pages/` or markdown files rendered via `[regular].astro`.
- **DO NOT** forget to wrap your custom Astro pages with `<Base>`. Without it, the page will lack the global stylesheets, header, footer, and SEO tags.
- **DO NOT** manually create `.astro` routes in `src/pages/` for markdown files that are already handled by `[regular].astro`, as this will cause route conflicts.
- **DO NOT** guess the component structure for page headers or layouts. Always verify how existing custom `.astro` pages implement them to ensure you are using the correct top-level components (rather than incorrectly using sub-components).
