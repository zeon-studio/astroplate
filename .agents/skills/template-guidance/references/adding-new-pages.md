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
3. **How it renders**: The file `src/pages/[regular].astro` acts as a catch-all route for pages defined in the `pages` content collection. It automatically reads the markdown file, passes it to the `Base.astro` layout, and renders the content using Astro's `<Content />` component.

### Method 2: Adding a Custom Astro Page

If the page requires custom layout structures, heavy data fetching, or multiple distinct React islands:

1. **Create the `.astro` file**: Create a file directly in `src/pages/` (e.g., `src/pages/my-custom-page.astro`).
2. **Structure the Page**: Use the `Base.astro` component to wrap your page so it inherits the header, footer, and SEO.

   ```astro
   ---
   import Base from "@/layouts/Base.astro";
   ---

   <Base title="My Custom Page" description="Custom description">
     <section class="section">
       <div class="container">
         <h1 class="text-h2">My Custom Page</h1>
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
