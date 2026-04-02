<h1 align=center>EmDash + Astro Starter Template</h1>

<p align=center>Astroplate is a free starter template built with Astro, TailwindCSS & TypeScript, powered by EmDash CMS — providing everything you need to jumpstart your Astro project and save valuable time.</p>

<p align=center>Made with ♥ by <a href="https://zeon.studio/">Zeon Studio</a></p>

<p align=center> If you find this project useful, please give it a ⭐ to show your support. </p>

<h2 align="center">
  <a target="_blank" href="https://astroplate.netlify.app/" rel="nofollow">👀 Demo</a> |
  <a target="_blank" href="https://pagespeed.web.dev/analysis/https-astroplate-netlify-app/yzx3foum3w?form_factor=desktop">Page Speed (100%) 🚀</a>
</h2>

<p align=center>
  <a href="https://github.com/withastro/astro/releases/tag/astro%406.0.4">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=6.0.4&color=000&logo=astro" alt="Astro Version 6.0.4"/>
  </a>
  <a href="https://github.com/zeon-studio/astroplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/astroplate" alt="license">
  </a>
  <img src="https://img.shields.io/github/languages/code-size/zeon-studio/astroplate" alt="code size">
  <a href="https://github.com/zeon-studio/astroplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/astroplate" alt="contributors">
  </a>
</p>

## 🖊️ EmDash CMS

Astroplate is powered by **EmDash** — a native Astro CMS with a built-in admin panel, SQLite database, and live content editing. No external service required; everything runs locally alongside your dev server.

### 👉 First-Time Setup

**1. Create your `.env` file:**

```bash
cp .env.example .env
```

Fill in the two required secrets. Generate them with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```env
EMDASH_AUTH_SECRET=your_random_secret_at_least_32_chars
EMDASH_PREVIEW_SECRET=your_random_preview_secret
```

**2. Initialize the database:**

```bash
yarn emdash init
```

This creates `data.db` in the project root and runs all migrations.

**3. Start the dev server:**

```bash
yarn dev
```

**4. Open the admin panel:**

Go to **`http://localhost:4321/_emdash/admin`**

> **Dev login shortcut:** Navigate to `http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` to instantly create a `dev@emdash.local` admin account and log in without email setup.

### 👉 Admin Panel URLs

| URL | Purpose |
|-----|---------|
| `/_emdash/admin` | Admin login & dashboard |
| `/_emdash/admin/posts` | Manage blog posts |
| `/_emdash/admin/pages` | Manage static pages |
| `/_emdash/admin/media` | Media library |
| `/_emdash/admin/settings` | Site settings |

### 👉 Content Architecture

| Content Type | Source | Query Method |
|---|---|---|
| Blog posts | EmDash database | `getEmDashCollection("posts")` |
| Pages | EmDash database | `getEmDashCollection("pages")` |
| Homepage, About, Sections | `src/content/` Markdown | `getListPage()` / `getSinglePage()` |

### 👉 EmDash CLI Commands

```bash
yarn emdash init          # Initialize database & run migrations
yarn emdash doctor        # Check database health
yarn emdash seed          # Apply a seed file
yarn emdash export-seed   # Export current database as a seed file
yarn emdash schema        # Manage collections and fields
yarn emdash content       # Manage content from the CLI
```

### ⚠️ macOS Build Note

`better-sqlite3` requires native C++ compilation. On **macOS 15 (Sequoia)**, if you hit a `'climits' file not found` error after `yarn install`, run this once:

```bash
CXXFLAGS="-isystem $(xcrun --sdk macosx --show-sdk-path)/usr/include/c++/v1 \
  -isysroot $(xcrun --sdk macosx --show-sdk-path)" \
  npm rebuild better-sqlite3
```

## 📌 Key Features

- 🖊️ EmDash CMS — built-in admin panel & SQLite database
- 👥 Multi-Authors
- 🌐 Multilingual
- 🎯 Similar Posts Suggestion
- 🔍 Search Functionality
- 🌑 Dark Mode
- 🏷️ Tags & Categories
- 🔗 Netlify setting pre-configured
- 📞 Support contact form
- 📱 Fully responsive
- 📝 Write and update content via the EmDash admin
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
- EmDash CMS
- Cloudflare Workers (optional deployment)

## 🐞 Reporting Issues

We use GitHub Issues as the official bug tracker for this Template. Please Search [existing issues](https://github.com/zeon-studio/astroplate/issues). It's possible someone has already reported the same problem.
If your problem or idea has not been addressed yet, feel free to [open a new issue](https://github.com/zeon-studio/astroplate/issues).

## 📝 License

Copyright (c) 2023 - Present, Designed & Developed by [Zeon Studio](https://zeon.studio/)

**Code License:** Released under the [MIT](https://github.com/zeon-studio/astroplate/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their own license, we don't have permission to share those images.

## 💻 Need Custom Development Services?

If you need a custom theme, theme customization, or complete website development services from scratch you can [Hire Us](https://zeon.studio/).
