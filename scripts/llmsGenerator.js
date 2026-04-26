import { glob } from "glob";
import { parse } from "node-html-parser";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, "../src/config/config.json");
const LANGUAGE_PATH = path.join(__dirname, "../src/config/language.json");

// ─── Default patterns to always skip ────────────────────────────────────────
const DEFAULT_EXCLUDES = [
  "node_modules",
  "_astro",
  "404",
  "404.html",
  "**/*.xml",
  "**/*.txt",
];

// ─── URL path prefixes that are API / system routes ──────────────────────────
const API_ROUTE_PREFIXES = ["/api/", "/_", "/cdn-cgi/"];

function isApiRoute(urlPath) {
  return API_ROUTE_PREFIXES.some((prefix) => urlPath.startsWith(prefix));
}

// ─── Config ──────────────────────────────────────────────────────────────────
function getConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("config.json not found");
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

  if (!config.llms) {
    throw new Error("llms configuration not found in config.json");
  }

  return config;
}

async function getAstroI18nConfig() {
  const astroPath = path.join(__dirname, "../astro.config.mjs");
  if (!fs.existsSync(astroPath)) return null;

  let content = fs.readFileSync(astroPath, "utf8");
  const projectRoot = path.resolve(__dirname, "..");

  // Replace JSON imports with fs.readFileSync so plain Node can evaluate the file
  content = content.replace(
    /import\s+config\s+from\s+['"]\.\/src\/config\/config\.json['"];?\s*\n/,
    `const config = JSON.parse(fs.readFileSync(${JSON.stringify(path.join(projectRoot, "src/config/config.json"))}));
`,
  );
  content = content.replace(
    /import\s+languagesJSON\s+from\s+['"]\.\/src\/config\/language\.json['"];?\s*\n/,
    `const languagesJSON = JSON.parse(fs.readFileSync(${JSON.stringify(path.join(projectRoot, "src/config/language.json"))}));
`,
  );
  content = content.replace(
    /import\s+theme\s+from\s+['"]\.\/src\/config\/theme\.json['"];?\s*\n/,
    `const theme = JSON.parse(fs.readFileSync(${JSON.stringify(path.join(projectRoot, "src/config/theme.json"))}));
`,
  );

  // Remove named imports from astro/config (we polyfill them below)
  content = content.replace(
    /import\s+\{\s*defineConfig\s*,\s*fontProviders\s*\}\s+from\s+['"]astro\/config['"];?\s*\n/,
    "\n",
  );

  // Stub remaining package imports so the config object evaluates safely
  const stubImports = [
    {
      regex: /import\s+mdx\s+from\s+['"]@astrojs\/mdx['"];?\s*\n/,
      name: "mdx",
    },
    {
      regex: /import\s+react\s+from\s+['"]@astrojs\/react['"];?\s*\n/,
      name: "react",
    },
    {
      regex: /import\s+sitemap\s+from\s+['"]@astrojs\/sitemap['"];?\s*\n/,
      name: "sitemap",
    },
    {
      regex: /import\s+tailwindcss\s+from\s+['"]@tailwindcss\/vite['"];?\s*\n/,
      name: "tailwindcss",
    },
    {
      regex: /import\s+AutoImport\s+from\s+['"]astro-auto-import['"];?\s*\n/,
      name: "AutoImport",
    },
    {
      regex: /import\s+remarkCollapse\s+from\s+['"]remark-collapse['"];?\s*\n/,
      name: "remarkCollapse",
    },
    {
      regex: /import\s+remarkToc\s+from\s+['"]remark-toc['"];?\s*\n/,
      name: "remarkToc",
    },
    { regex: /import\s+sharp\s+from\s+['"]sharp['"];?\s*\n/, name: "sharp" },
  ];

  for (const { regex, name } of stubImports) {
    content = content.replace(regex, `const ${name} = () => ({});\n`);
  }

  // Prepend fs import and polyfills
  const tempContent = `import fs from "node:fs";
const defineConfig = (x) => x;
const fontProviders = { google: () => ({}) };
${content}`;

  const tempName = `astro.config.llms-temp-${Date.now()}.mjs`;
  const tempPath = path.join(projectRoot, tempName);

  fs.writeFileSync(tempPath, tempContent, "utf8");

  try {
    const mod = await import(tempPath);
    fs.unlinkSync(tempPath);
    return mod.default?.i18n || null;
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.warn(
      `   ⚠️  Could not read i18n from astro.config.mjs: ${err.message}`,
    );
    return null;
  }
}

function getLanguageFallback() {
  let languages = [];
  let defaultLanguage = "";
  let defaultLanguageInSubdir = false;

  try {
    if (fs.existsSync(LANGUAGE_PATH)) {
      const languagesJSON = JSON.parse(fs.readFileSync(LANGUAGE_PATH, "utf8"));
      languages = languagesJSON.map((l) => l.languageCode).filter(Boolean);
    }
  } catch {
    // ignore missing or malformed language.json
  }

  try {
    const config = getConfig();
    defaultLanguage = config.settings?.default_language || "";
    defaultLanguageInSubdir =
      config.settings?.default_language_in_subdir === true;
  } catch {
    // ignore
  }

  return { languages, defaultLanguage, defaultLanguageInSubdir };
}

function isDefaultLanguagePath(
  urlPath,
  languages,
  defaultLanguage,
  defaultInSubdir,
) {
  if (!languages.length || !defaultLanguage) return true;

  const parts = urlPath.split("/").filter(Boolean);
  const firstPart = parts[0];

  const isLangPrefixed = languages.includes(firstPart);

  if (defaultInSubdir) {
    // Only keep paths explicitly prefixed with the default language
    return firstPart === defaultLanguage;
  }

  // defaultInSubdir is false: default language lives at root.
  // Keep only non-prefixed paths.
  return !isLangPrefixed;
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

/**
 * Returns the Astro static-asset output directory.
 * In SSR mode (output: "server") Astro puts static files in dist/client/.
 * In static mode (output: "static") they go directly in dist/.
 */
function getClientDir(distFolder) {
  const clientDir = path.join(distFolder, "client");
  return fs.existsSync(clientDir) ? clientDir : distFolder;
}

function normalizePattern(baseDir, pattern) {
  const cleanPattern = pattern.replace(/^\/+/, "");
  const fullPath = path.join(baseDir, cleanPattern);

  try {
    if (fs.statSync(fullPath).isDirectory()) {
      return path.join(fullPath, "**/*.html");
    }
  } catch {
    // treat as glob pattern
  }

  return fullPath;
}

async function discoverHtmlFiles(clientDir, excludePatterns, includePatterns) {
  const patterns =
    includePatterns?.length > 0
      ? includePatterns.map((p) => normalizePattern(clientDir, p))
      : [path.join(clientDir, "**/*.html")];

  const userExcludes = (excludePatterns || []).map((p) =>
    normalizePattern(clientDir, p),
  );

  const ignore = [
    ...DEFAULT_EXCLUDES.map((p) => path.join(clientDir, p)),
    ...userExcludes,
  ];

  let files = await glob(patterns, { ignore, absolute: true });

  files = files.filter((f) => fs.statSync(f).isFile() && f.endsWith(".html"));

  return files.sort();
}

function fileToUrlPath(filePath, clientDir) {
  const relativePath = filePath.replace(path.resolve(clientDir), "");
  let urlPath = relativePath.replace(/\\/g, "/").replace(/^\//, "");

  urlPath = urlPath.replace(/\.html$/, "");

  if (urlPath.endsWith("/index") || urlPath === "index") {
    urlPath = urlPath.replace(/\/index$/, "").replace(/^index$/, "");
  }

  return "/" + urlPath;
}

// ─── HTML parsing helpers ─────────────────────────────────────────────────────

function getTitle(root, titleSelector) {
  let el;
  if (titleSelector) el = root.querySelector(titleSelector);
  if (!el) el = root.querySelector("h1");
  if (!el) el = root.querySelector("h2");
  if (!el) el = root.querySelector("h3");
  if (!el) el = root.querySelector("title");
  return el?.text?.trim() || "";
}

function getContentElement(root, contentSelector) {
  let el;
  if (contentSelector) el = root.querySelector(contentSelector);
  if (!el) el = root.querySelector("main");
  if (!el) el = root.querySelector("body");
  if (!el) el = root.querySelector("html");
  return el;
}

async function processHtml(html, llmsConfig) {
  const root = parse(html);

  const title = getTitle(root, llmsConfig?.title_selector);

  const metaDescription = root.querySelector('meta[name="description"]');
  const description = metaDescription?.getAttribute("content") || "";

  const contentElement = getContentElement(root, llmsConfig?.content_selector);
  let content = "";

  if (contentElement) {
    contentElement
      .querySelectorAll("script, style, noscript, iframe, svg")
      .forEach((el) => el.remove());

    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    });

    turndownService.addRule("removeChrome", {
      filter: ["nav", "footer", "header", "aside"],
      replacement: () => "",
    });

    content = turndownService.turndown(contentElement.innerHTML);
  }

  return { title, description, content };
}

async function processHtmlFile(filePath, llmsConfig) {
  const html = fs.readFileSync(filePath, "utf8");
  return processHtml(html, llmsConfig);
}

/**
 * Fetches a page from a server and processes it as HTML.
 * Returns null if the fetch fails or the page returns an error status.
 */
async function fetchAndProcessPage(url, llmsConfig) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return null;

    const html = await response.text();
    return processHtml(html, llmsConfig);
  } catch {
    return null;
  }
}

// ─── Temporary server management ──────────────────────────────────────────────

const TEMP_PORT = 14321;
const TEMP_HOST = "127.0.0.1";

/**
 * Checks if a server is already reachable at the given URL.
 */
async function isServerRunning(url) {
  try {
    const r = await fetch(url + "/", {
      signal: AbortSignal.timeout(2_000),
      headers: { Accept: "text/html" },
    });
    return r.status < 500;
  } catch {
    return false;
  }
}

/**
 * Spawns dist/server/entry.mjs on TEMP_PORT and waits until it's ready.
 * Returns { process, baseUrl } or null if it can't be started.
 */
async function startTempServer(distFolder) {
  const entryPath = path.join(distFolder, "server", "entry.mjs");

  if (!fs.existsSync(entryPath)) {
    console.log(
      "   ⚠️  No standalone server entry (dist/server/entry.mjs) found.",
    );
    return null;
  }

  console.log(
    `   Spawning built server on port ${TEMP_PORT} to render SSR pages...`,
  );

  const serverProcess = spawn(process.execPath, [entryPath], {
    env: {
      ...process.env,
      PORT: String(TEMP_PORT),
      HOST: TEMP_HOST,
    },
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  serverProcess.stderr.on("data", (d) => {
    // Suppress noise but keep it available for debugging
    if (process.env.LLMS_DEBUG) process.stderr.write(d);
  });

  const tempBaseUrl = `http://${TEMP_HOST}:${TEMP_PORT}`;

  // Poll until the server responds or timeout
  const ready = await new Promise((resolve) => {
    const TIMEOUT_MS = 20_000;
    const POLL_MS = 400;

    const deadline = setTimeout(() => {
      clearInterval(poll);
      resolve(false);
    }, TIMEOUT_MS);

    const poll = setInterval(async () => {
      try {
        const r = await fetch(tempBaseUrl + "/", {
          signal: AbortSignal.timeout(1_000),
        });
        if (r.status < 500) {
          clearInterval(poll);
          clearTimeout(deadline);
          resolve(true);
        }
      } catch {
        // not ready yet
      }
    }, POLL_MS);

    serverProcess.on("error", () => {
      clearInterval(poll);
      clearTimeout(deadline);
      resolve(false);
    });

    serverProcess.on("exit", (code) => {
      if (code !== null) {
        clearInterval(poll);
        clearTimeout(deadline);
        resolve(false);
      }
    });
  });

  if (!ready) {
    console.log("   ⚠️  Temp server did not become ready in time.");
    serverProcess.kill();
    return null;
  }

  console.log(`   ✓ Temp server ready at ${tempBaseUrl}`);
  return { process: serverProcess, baseUrl: tempBaseUrl };
}

function stopTempServer(serverHandle) {
  if (serverHandle?.process) {
    serverHandle.process.kill();
    console.log("   Stopped temporary server.\n");
  }
}

// ─── SSR page discovery from source ──────────────────────────────────────────

/**
 * Scans src/pages/ for static (non-dynamic) route files and returns their
 * URL paths. Dynamic routes ([slug].astro) and the api/ folder are excluded
 * since they either already have HTML files or are API-only.
 */
function discoverSsrPageRoutes(srcPagesDir, basePath) {
  if (!fs.existsSync(srcPagesDir)) return [];

  const routes = [];

  function scanDir(dir, urlPrefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const name = entry.name;

      // Skip hidden items and the api/ directory
      if (name.startsWith(".") || name === "api") continue;

      const fullPath = path.join(dir, name);

      if (entry.isDirectory()) {
        scanDir(fullPath, `${urlPrefix}/${name}`);
      } else if (
        entry.isFile() &&
        /\.(astro|md|mdx|ts|js)$/.test(name) &&
        !name.startsWith("_") &&
        !name.startsWith("[") // skip dynamic routes — they have per-entry HTML files
      ) {
        const stem = name.replace(/\.(astro|md|mdx|ts|js)$/, "");

        if (stem === "404") continue;

        const routePath =
          stem === "index" ? urlPrefix || "/" : `${urlPrefix}/${stem}`;

        const normalizedRoute = routePath || "/";

        if (isApiRoute(normalizedRoute)) continue;

        routes.push(normalizedRoute);
      }
    }
  }

  scanDir(srcPagesDir, basePath === "/" ? "" : basePath.replace(/\/$/, ""));

  return [...new Set(routes)].sort();
}

// ─── Output generators ────────────────────────────────────────────────────────

function generateMarkdownFile(page, siteUrl) {
  const url = `${siteUrl}${page.urlPath}`.replace(/(?<=.)\/$/, "");

  let md = "---\n";
  md += `title: "${page.title.replace(/"/g, '\\"')}"\n`;
  md += `url: "${url}"\n`;
  if (page.description) {
    md += `description: "${page.description.replace(/"/g, '\\"')}"\n`;
  }
  md += "---\n\n";
  md += page.content;

  return md;
}

function generateLlmsTxtContent(
  pages,
  siteUrl,
  siteName,
  siteDescription,
  generateIndividualMd,
) {
  let content = `# ${siteName}\n\n`;

  if (siteDescription) {
    content += `> ${siteDescription}\n\n`;
  }

  content +=
    "This file helps language models discover the most useful content on this site.\n\n";

  const grouped = {};
  pages.forEach((page) => {
    const parts = page.urlPath.split("/").filter(Boolean);
    const group = parts.length === 0 ? "Home" : parts[0];

    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(page);
  });

  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    if (a === "Home") return -1;
    if (b === "Home") return 1;
    return a.localeCompare(b);
  });

  sortedGroups.forEach((group) => {
    const groupName = group.charAt(0).toUpperCase() + group.slice(1);
    content += `## ${groupName}\n\n`;

    grouped[group].forEach((page) => {
      let linkUrl;
      if (generateIndividualMd) {
        const mdPath =
          page.urlPath === "/" ? "/index.md" : `${page.urlPath}.md`;
        linkUrl = `${siteUrl}${mdPath}`.replace(/([^:])\/\//g, "$1/");
      } else {
        linkUrl = `${siteUrl}${page.urlPath}`.replace(/(?<=.)\/$/, "");
      }
      const linkText = page.title || page.urlPath;

      if (page.description) {
        content += `- [${linkText}](${linkUrl}): ${page.description}\n`;
      } else {
        content += `- [${linkText}](${linkUrl})\n`;
      }
    });

    content += "\n";
  });

  return content;
}

function generateLlmsFullTxtContent(pages, siteUrl, siteName) {
  let content = `# ${siteName}\n\n`;
  content += `URL: ${siteUrl}\n\n`;

  pages.forEach((page, index) => {
    const url = `${siteUrl}${page.urlPath}`.replace(/(?<=.)\/$/, "");
    content += `## ${page.title}\n\n`;
    content += `URL: ${url}\n\n`;

    if (page.description) {
      content += `${page.description}\n\n`;
    }

    content += page.content;

    if (index < pages.length - 1) {
      content += "\n\n---\n\n";
    }
  });

  return content;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generateLlmsFiles() {
  const config = getConfig();
  const llms = config.llms;

  const astroI18n = await getAstroI18nConfig();
  const fallback = getLanguageFallback();

  const languages = astroI18n?.locales || fallback.languages;
  const defaultLanguage = astroI18n?.defaultLocale || fallback.defaultLanguage;
  const defaultLanguageInSubdir = fallback.defaultLanguageInSubdir;

  const distFolder = path.join(__dirname, "../dist");

  if (!fs.existsSync(distFolder)) {
    console.error("❌ dist/ folder does not exist. Run 'astro build' first.");
    process.exit(1);
  }

  // In SSR mode static assets live in dist/client/; in static mode in dist/
  const clientDir = getClientDir(distFolder);
  const isSSR = clientDir !== distFolder;

  console.log(
    `📂 Output mode: ${isSSR ? "SSR (dist/client)" : "Static (dist)"}`,
  );

  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const basePath = (config.site.base_path || "/").replace(/\/$/, "") || "/";
  const siteName = config.site.title;
  const siteDescription = config.metadata?.meta_description || "";

  // ── Step 1: Discover pre-rendered HTML files ────────────────────────────
  console.log("\n🔍 Discovering pre-rendered HTML files...");
  const htmlFiles = await discoverHtmlFiles(
    clientDir,
    llms.exclude,
    llms.include,
  );
  console.log(`   Found ${htmlFiles.length} pre-rendered HTML files`);

  const pages = [];
  const seenPaths = new Set();

  for (const file of htmlFiles) {
    try {
      const urlPath = fileToUrlPath(file, clientDir);

      if (isApiRoute(urlPath)) {
        console.log(`   ⤷ Skipping API route: ${urlPath}`);
        continue;
      }

      if (
        !isDefaultLanguagePath(
          urlPath,
          languages,
          defaultLanguage,
          defaultLanguageInSubdir,
        )
      ) {
        console.log(`   ⤷ Skipping non-default language: ${urlPath}`);
        continue;
      }

      if (seenPaths.has(urlPath)) continue;
      seenPaths.add(urlPath);

      const pageData = await processHtmlFile(file, llms);

      if (!pageData.title) {
        console.log(`   ⚠️  No title found for ${urlPath}, skipping`);
        continue;
      }

      pages.push({
        urlPath,
        filePath: file,
        source: "prerendered",
        ...pageData,
      });
      console.log(`   ✓ [static] ${urlPath}: "${pageData.title}"`);
    } catch (error) {
      console.error(`   ✗ Error processing ${file}: ${error.message}`);
    }
  }

  // ── Step 2: Fetch SSR-only pages ───────────────────────────────────────
  if (isSSR) {
    const srcPagesDir = path.join(__dirname, "../src/pages");
    const ssrRoutes = discoverSsrPageRoutes(srcPagesDir, basePath);
    const missingRoutes = ssrRoutes
      .filter((r) =>
        isDefaultLanguagePath(
          r,
          languages,
          defaultLanguage,
          defaultLanguageInSubdir,
        ),
      )
      .filter((r) => !seenPaths.has(r));

    if (missingRoutes.length === 0) {
      console.log("\n✓ All source routes already captured by static HTML.");
    } else {
      console.log(
        `\n🌐 Fetching ${missingRoutes.length} SSR-only route(s): ${missingRoutes.join(", ")}`,
      );

      // Determine which server to use: the configured siteUrl or a temp server
      let fetchBase = null;
      let tempServerHandle = null;

      if (await isServerRunning(siteUrl)) {
        fetchBase = siteUrl;
        console.log(`   Using running server at ${fetchBase}`);
      } else {
        tempServerHandle = await startTempServer(distFolder);
        if (tempServerHandle) {
          fetchBase = tempServerHandle.baseUrl;
        } else {
          console.log(
            "   ⚠️  No server available. SSR pages will be skipped.\n" +
              "       Run 'yarn preview' before 'yarn generate-llms' to include them.",
          );
        }
      }

      if (fetchBase) {
        for (const route of missingRoutes) {
          const url = `${fetchBase}${route}`;
          process.stdout.write(`   ⤷ Fetching ${route} ... `);

          const pageData = await fetchAndProcessPage(url, llms);

          if (!pageData) {
            console.log("❌ failed");
            continue;
          }

          if (!pageData.title) {
            console.log("⚠️  no title, skipping");
            continue;
          }

          seenPaths.add(route);
          pages.push({
            urlPath: route,
            filePath: null,
            source: "ssr",
            ...pageData,
          });
          console.log(`✓ "${pageData.title}"`);
        }
      }

      stopTempServer(tempServerHandle);
    }
  }

  // Sort pages: home first, then alphabetically
  pages.sort((a, b) => {
    if (a.urlPath === "/") return -1;
    if (b.urlPath === "/") return 1;
    return a.urlPath.localeCompare(b.urlPath);
  });

  console.log(`\n   ✅ Total pages processed: ${pages.length}\n`);

  // ── Step 3: Generate individual .md files ──────────────────────────────
  if (llms.generate_individual_md) {
    console.log("📝 Generating individual .md files...");

    // Remove stale .md files from previous runs (e.g. non-default languages)
    function deleteStaleMdFiles(dir) {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          deleteStaleMdFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
          fs.unlinkSync(fullPath);
        }
      }
    }
    deleteStaleMdFiles(clientDir);

    for (const page of pages) {
      // Home → index.md, everything else → <url-path>.md
      const mdRelative =
        page.urlPath === "/" ? "index" : page.urlPath.replace(/^\//, "");
      const mdPath = path.join(clientDir, mdRelative + ".md");

      const mdContent = generateMarkdownFile(page, siteUrl);

      const mdDir = path.dirname(mdPath);
      if (!fs.existsSync(mdDir)) {
        fs.mkdirSync(mdDir, { recursive: true });
      }

      fs.writeFileSync(mdPath, mdContent, "utf8");
      console.log(`   ✓ ${path.relative(distFolder, mdPath)}`);
    }

    console.log(`   Created ${pages.length} .md files\n`);
  }

  // ── Step 4: Generate llms.txt ──────────────────────────────────────────
  if (llms.generate_llms_txt) {
    console.log("📋 Generating llms.txt...");

    const llmsTxtContent = generateLlmsTxtContent(
      pages,
      siteUrl,
      siteName,
      siteDescription,
      llms.generate_individual_md,
    );
    const llmsTxtPath = path.join(clientDir, "llms.txt");

    fs.writeFileSync(llmsTxtPath, llmsTxtContent, "utf8");
    console.log(`   ✓ ${path.relative(distFolder, llmsTxtPath)}\n`);
  }

  // ── Step 5: Generate llms-full.txt ────────────────────────────────────
  if (llms.generate_llms_full_txt) {
    console.log("📚 Generating llms-full.txt...");

    const llmsFullContent = generateLlmsFullTxtContent(
      pages,
      siteUrl,
      siteName,
    );
    const llmsFullPath = path.join(clientDir, "llms-full.txt");

    fs.writeFileSync(llmsFullPath, llmsFullContent, "utf8");
    console.log(`   ✓ ${path.relative(distFolder, llmsFullPath)}\n`);
  }

  // ── Summary ────────────────────────────────────────────────────────────
  console.log("✅ LLMS generation complete!\n");
  console.log("Summary:");
  console.log(`  Pages processed : ${pages.length}`);
  console.log(
    `  Sources         : ${pages.filter((p) => p.source === "prerendered").length} static HTML, ${pages.filter((p) => p.source === "ssr").length} SSR-fetched`,
  );
  if (llms.generate_individual_md) {
    console.log(
      `  .md files       : ${pages.length} (in ${path.relative(distFolder, clientDir)}/)`,
    );
  }
  if (llms.generate_llms_txt) {
    console.log(
      `  llms.txt        : ${path.relative(distFolder, path.join(clientDir, "llms.txt"))}`,
    );
  }
  if (llms.generate_llms_full_txt) {
    console.log(
      `  llms-full.txt   : ${path.relative(distFolder, path.join(clientDir, "llms-full.txt"))}`,
    );
  }
}

generateLlmsFiles().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
