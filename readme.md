<h1 align=center>Astro + Tailwind CSS + TypeScript Starter and Boilerplate</h1>

<p align=center>Astroplate is a free starter template built with Astro, TailwindCSS & TypeScript, providing everything you need to jumpstart your Astro project and save valuable time.</p>

<p align=center>Made with ♥ by <a href="https://zeon.studio/">Zeon Studio</a></p>

<p align=center> If you find this project useful, please give it a ⭐ to show your support. </p>

<h2 align="center"> <a target="_blank" href="https://astroplate.netlify.app/" rel="nofollow">👀 Demo</a> | <a target="_blank" href="https://astroplate-multilang.netlify.app/" rel="nofollow">👀 Demo Multilang</a> | <a  target="_blank" href="https://pagespeed.web.dev/analysis/https-astroplate-netlify-app/yzx3foum3w?form_factor=desktop">Page Speed (100%)🚀</a> |   <a target="_blank" href="https://app.sitepins.com/new/clone?name=Astroplate&repository=https://github.com/zeon-studio/astroplate/">
    <img src="https://sitepins.com/button.svg" alt="Edit with Sitepins">
  </a>
</h2>

<p align=center>
  <a href="https://github.com/withastro/astro/releases/tag/astro%406.0.4">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=6.0.4&color=000&logo=astro"  alt="Astro Version 6.0.4"/>
  </a>

  <a href="https://github.com/zeon-studio/astroplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/astroplate" alt="license"></a>

  <img src="https://img.shields.io/github/languages/code-size/zeon-studio/astroplate" alt="code size">

  <a href="https://github.com/zeon-studio/astroplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/astroplate" alt="contributors"></a>
</p>

## 📌 Key Features

- 👥 Multi-Authors
- 🌐 Multilingual
- 🎯 Similar Posts Suggestion
- 🔍 Search Functionality
- 🌑 Dark Mode
- 🏷️ Tags & Categories
- 🔗 Netlify setting pre-configured
- 📞 Support contact form
- 📱 Fully responsive
- 📝 Write and update content in Markdown / MDX
- 📎 Google Tag Manager
- 💬 Disqus Comment
- 🔳 Syntax Highlighting

### 📄 15+ Pre-designed Pages

- 🏠 Homepage
- 👤 About
- 📞 Contact
- 👥 Authors
- 👤 Author Single
- 📝 Blog
- 📝 Blog Single
- 🚫 Custom 404
- 💡 Elements
- 📄 Privacy Policy
- 🏷️ Tags
- 🏷️ Tag Single
- 🗂️ Categories
- 🗂️ Category Single
- 🔍 Search

## 🔗 Integrations

- astro/react
- astro/sitemap
- astro/tailwind
- Cloudflare Workers (optional deployment)

## 🚀 Getting Started

### 📦 Dependencies

- astro v6.0.4
- node v22.12.0+ (see `.nvmrc`)
- yarn v1.22+
- tailwind v4+

### 👉 Install Dependencies

```bash
yarn install
```

### 👉 Development Command

```bash
yarn run dev
```

### 👉 Build Command

```bash
yarn run build
```

### 👉 Preview on Cloudflare Workers

```bash
yarn run preview:cf-workers
```

### 👉 Deploy to Cloudflare Workers

```bash
yarn run deploy:cf-workers
```

### 👉 Build and Run With Docker

```bash
docker build -t astroplate .
# or
# docker build --build-arg INSTALLER=npm -t astroplate .
# or
# docker build --build-arg INSTALLER=pnpm -t astroplate .

docker run -p 3000:80 astroplate
# or
# docker run --rm -p 3000:80 astroplate
```

To access the shell within the container:

```bash
docker run -it --rm astroplate ash
```

<!-- edit with emdash -->

## 📝 Edit Content with EmDash CMS

This template is integrated with [**EmDash**](https://emdash.dev), a native Astro CMS with a built-in admin panel, SQLite database, and live content editing.

### Prerequisites

- [Node.js](https://nodejs.org) v22+ (if you are on macOS and hit `climits` build errors, see the note below)
- `better-sqlite3` requires native compilation. On **macOS 15 (Sequoia)** with the Command Line Tools SDK, run this once instead of a plain `npm rebuild`:

  ```bash
  CXXFLAGS="-isystem $(xcrun --sdk macosx --show-sdk-path)/usr/include/c++/v1 \
    -isysroot $(xcrun --sdk macosx --show-sdk-path)" \
    npm rebuild better-sqlite3
  ```

### 👉 Setup EmDash (first time)

**1. Create your `.env` file:**

```bash
cp .env.example .env   # or create .env manually
```

Add the following variables:

```env
EMDASH_AUTH_SECRET=your_random_secret_at_least_32_chars
EMDASH_PREVIEW_SECRET=your_random_preview_secret
```

You can generate secure secrets with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**2. Initialize the database:**

```bash
yarn emdash init
```

This creates `data.db` in the project root and runs all migrations.

**3. Start the dev server and access the admin panel:**

```bash
yarn dev
```

Then open **`http://localhost:4321/_emdash/admin`** in your browser.

> **First-time login (dev shortcut):** Navigate to `http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` — this creates a `dev@emdash.local` admin and logs you straight in.

**4. Verify your setup at any time:**

```bash
yarn emdash doctor
```

### 👉 EmDash Admin Panel

| URL | Purpose |
|-----|---------|
| `/_emdash/admin` | Admin login & dashboard |
| `/_emdash/admin/posts` | Manage blog posts |
| `/_emdash/admin/pages` | Manage static pages |
| `/_emdash/admin/media` | Media library |
| `/_emdash/admin/settings` | Site settings |

### 👉 Content Architecture

- **Blog posts** — managed in EmDash and queried via `getEmDashCollection("posts")`
- **Pages** — managed in EmDash and queried via `getEmDashCollection("pages")`
- **Static content** (homepage, about, contact, sections) — sourced from `src/content/` Markdown files via Astro Content Collections

### 👉 Useful EmDash CLI Commands

```bash
yarn emdash init          # Initialize / re-run migrations
yarn emdash doctor        # Check database health
yarn emdash seed          # Apply a seed file
yarn emdash export-seed   # Export current database as a seed
yarn emdash schema        # Manage collections and fields
yarn emdash content       # Manage content from the CLI
```

<!-- edit with sitepins -->

## 📝 Edit Static Content with Sitepins

For Markdown-based static content (homepage, sections, etc.) you can also use [**Sitepins**](https://sitepins.com):

  <a target="_blank" href="https://app.sitepins.com/new/clone?name=Astroplate&repository=https://github.com/zeon-studio/astroplate/">
    <img src="https://sitepins.com/button.svg" alt="Edit with Sitepins">
  </a>

<!-- reporting issue -->

## 🐞 Reporting Issues

We use GitHub Issues as the official bug tracker for this Template. Please Search [existing issues](https://github.com/zeon-studio/astroplate/issues). It’s possible someone has already reported the same problem.
If your problem or idea has not been addressed yet, feel free to [open a new issue](https://github.com/zeon-studio/astroplate/issues).

<!-- licence -->

## 📝 License

Copyright (c) 2023 - Present, Designed & Developed by [Zeon Studio](https://zeon.studio/)

**Code License:** Released under the [MIT](https://github.com/zeon-studio/astroplate/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their license, we don't have permission to share those images.

## 💻 Need Custom Development Services?

If you need a custom theme, theme customization, or complete website development services from scratch you can [Hire Us](https://zeon.studio/).
