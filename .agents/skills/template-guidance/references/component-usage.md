# Component Usage

This skill explains how the UI component architecture is structured in this Astro template.

## Component Architecture

Components are grouped into two primary folders within `src/layouts/`:

1. **`src/layouts/components/`**: Smaller, reusable UI elements.
2. **`src/layouts/partials/`**: Larger page sections or layout wrappers.

**Important for AI Agents:** The exact components available may vary. **Always list the contents of `src/layouts/components/` and `src/layouts/partials/` to discover what components exist in the current project.**

Common examples often found here include:

- `Base.astro` (the root HTML layout)
- `Header.astro`
- `Footer.astro`
- `BlogCard.tsx`
- `ThemeSwitcher.tsx`

## Astro vs. React Components (Islands Architecture)

This template heavily uses the **Astro Islands** architecture via `@astrojs/react`. You will encounter both `.astro` and `.tsx` files.

### `.astro` Components

- Used for static HTML rendering, layout wrappers, and data fetching.
- They execute entirely on the server.
- Example: `src/layouts/Base.astro` or `src/layouts/partials/Header.astro`.

### `.tsx` (React) Components

- Used for interactive UI elements that require state or client-side JavaScript (e.g., a search modal, a theme switcher, or an accordion).
- To make a React component interactive on the client, it must be hydrated using an Astro client directive like `client:load` or `client:idle`.
- Example Usage in an `.astro` file:

  ```astro
  ---
  import ThemeSwitcher from "@/components/ThemeSwitcher";
  ---

  <ThemeSwitcher client:load />
  ```

## Modifying Components

When extending components:

- **Styling**: Components generally use Tailwind utility classes directly.
- **Data Fetching**: Data fetching (like `getCollection('blog')`) typically happens inside `.astro` files. The data is then passed as props down to React or nested Astro components.

## Common Mistakes / What NOT to do

- **DO NOT** use React hooks (`useState`, `useEffect`) inside an `.astro` file. They are purely server-side. Move interactive logic into a `.tsx` file.
- **DO NOT** forget to add a `client:*` directive (like `client:load`) when rendering an interactive React component inside an `.astro` file. If omitted, the component will render as static HTML and its interactive features won't work.
