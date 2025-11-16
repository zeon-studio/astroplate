# Project Overview

This is a starter template for Astro projects, using Tailwind CSS for styling and TypeScript for type safety. It's designed to be a boilerplate for building fast, content-focused websites. The project includes features like multi-author support, multilingual capabilities, search functionality, dark mode, and more.

# Building and Running

The following commands are available to build and run the project:

- **Install dependencies:**
  ```bash
  yarn install
  ```

- **Run the development server:**
  ```bash
  yarn run dev
  ```

- **Build the project for production:**
  ```bash
  yarn run build
  ```

- **Preview the production build:**
  ```bash
  yarn run preview
  ```

- **Build and run with Docker:**
  ```bash
  docker build -t astroplate .
  docker run -p 3000:80 astroplate
  ```

# Development Conventions

- **Content:** Content is managed in Markdown (`.md`) and MDX (`.mdx`) files within the `src/content/` directory.
- **Configuration:** The main site configuration is in `src/config/config.json`. This includes the site title, base URL, and other settings.
- **Layouts:** The base layout for all pages is `src/layouts/Base.astro`. This file includes the main HTML structure, header, footer, and metadata.
- **Styling:** The project uses Tailwind CSS for styling. The main CSS file is `src/styles/main.css`.
- **Scripts:** The `package.json` file contains scripts for common tasks like running the development server, building the project, and formatting code.

# Gemini Instructions

- **Code Formatting:** Ensure all code written aligns with the project's existing formatting conventions.
- **Linting:** Always run the linter after writing code to check for any issues.
- **Node Version:** Before running any `npm` or `yarn` commands, ensure you are using the correct Node.js version by running `nvm use`.
