import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser.astro";
import { getTaxonomy } from "@/lib/taxonomyParser.astro";
import {
  enabledLanguages,
  getLangFromUrl,
  normalizeLang,
  slugSelector,
  stripLocaleFromId,
} from "@/lib/utils/languageParser";

const BLOG_FOLDER = "blog";
const PAGE_SIZE = config.settings.pagination;
const { default_language, default_language_in_subdir } = config.settings;

function getPathWithoutLocale(pathname: string, lang: string) {
  if (lang === default_language && !default_language_in_subdir) {
    return pathname || "/";
  }

  const prefix = `/${lang}`;

  if (pathname === prefix) {
    return "/";
  }

  if (pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length);
  }

  return pathname || "/";
}

function normalizePath(pathname: string) {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

export async function getLocaleSwitchTargets(pathname: string) {
  const currentLang = getLangFromUrl(new URL(pathname, "https://example.com"));
  const basePath = normalizePath(getPathWithoutLocale(pathname, currentLang));

  const blogPostSlugs = new Map<string, Set<string>>();
  const regularPageSlugs = new Map<string, Set<string>>();
  const authorSlugs = new Map<string, Set<string>>();
  const categorySlugs = new Map<string, Set<string>>();
  const tagSlugs = new Map<string, Set<string>>();
  const totalBlogPages = new Map<string, number>();

  async function getBlogSlugs(lang: string) {
    if (!blogPostSlugs.has(lang)) {
      const posts = await getSinglePage(BLOG_FOLDER, lang);
      blogPostSlugs.set(
        lang,
        new Set(posts.map((post) => stripLocaleFromId(post.id))),
      );
      totalBlogPages.set(
        lang,
        Math.ceil(posts.length / PAGE_SIZE) || 1,
      );
    }

    return blogPostSlugs.get(lang)!;
  }

  async function getPageSlugs(lang: string) {
    if (!regularPageSlugs.has(lang)) {
      const pages = await getSinglePage("pages", lang);
      regularPageSlugs.set(
        lang,
        new Set(pages.map((page) => stripLocaleFromId(page.id))),
      );
    }

    return regularPageSlugs.get(lang)!;
  }

  async function getAuthorSlugs(lang: string) {
    if (!authorSlugs.has(lang)) {
      const authors = await getSinglePage("authors", lang);
      authorSlugs.set(
        lang,
        new Set(authors.map((author) => stripLocaleFromId(author.id))),
      );
    }

    return authorSlugs.get(lang)!;
  }

  async function getCategorySlugs(lang: string) {
    if (!categorySlugs.has(lang)) {
      categorySlugs.set(
        lang,
        new Set(await getTaxonomy(BLOG_FOLDER, lang, "categories")),
      );
    }

    return categorySlugs.get(lang)!;
  }

  async function getTagSlugs(lang: string) {
    if (!tagSlugs.has(lang)) {
      tagSlugs.set(lang, new Set(await getTaxonomy(BLOG_FOLDER, lang, "tags")));
    }

    return tagSlugs.get(lang)!;
  }

  async function resolveTargetForLang(targetLang: string) {
    const normalizedLang = normalizeLang(targetLang);

    if (basePath === "/" || basePath === "/blog") {
      return slugSelector("/", normalizedLang);
    }

    const archiveMatch = basePath.match(/^\/(?:blog\/)?page\/(\d+)$/);
    if (archiveMatch) {
      const pageNumber = Number(archiveMatch[1]);
      await getBlogSlugs(normalizedLang);
      const totalPages = totalBlogPages.get(normalizedLang) || 1;

      if (pageNumber <= totalPages) {
        return pageNumber === 1
          ? slugSelector("/", normalizedLang)
          : slugSelector(`/page/${pageNumber}`, normalizedLang);
      }

      return slugSelector("/", normalizedLang);
    }

    if (basePath === "/about" || basePath === "/contact") {
      return slugSelector(basePath, normalizedLang);
    }

    if (basePath === "/authors" || basePath === "/categories" || basePath === "/tags") {
      return slugSelector(basePath, normalizedLang);
    }

    const authorMatch = basePath.match(/^\/authors\/([^/]+)$/);
    if (authorMatch) {
      const slug = authorMatch[1];
      const slugs = await getAuthorSlugs(normalizedLang);
      return slugs.has(slug)
        ? slugSelector(`/authors/${slug}`, normalizedLang)
        : slugSelector("/authors", normalizedLang);
    }

    const categoryMatch = basePath.match(/^\/categories\/([^/]+)$/);
    if (categoryMatch) {
      const slug = categoryMatch[1];
      const slugs = await getCategorySlugs(normalizedLang);
      return slugs.has(slug)
        ? slugSelector(`/categories/${slug}`, normalizedLang)
        : slugSelector("/categories", normalizedLang);
    }

    const tagMatch = basePath.match(/^\/tags\/([^/]+)$/);
    if (tagMatch) {
      const slug = tagMatch[1];
      const slugs = await getTagSlugs(normalizedLang);
      return slugs.has(slug)
        ? slugSelector(`/tags/${slug}`, normalizedLang)
        : slugSelector("/tags", normalizedLang);
    }

    const blogPostMatch = basePath.match(/^\/blog\/([^/]+)$/);
    if (blogPostMatch) {
      const slug = blogPostMatch[1];
      const slugs = await getBlogSlugs(normalizedLang);
      return slugs.has(slug)
        ? slugSelector(`/blog/${slug}`, normalizedLang)
        : slugSelector("/", normalizedLang);
    }

    const regularPageMatch = basePath.match(/^\/([^/]+)$/);
    if (regularPageMatch) {
      const slug = regularPageMatch[1];
      const slugs = await getPageSlugs(normalizedLang);
      return slugs.has(slug)
        ? slugSelector(`/${slug}`, normalizedLang)
        : slugSelector("/", normalizedLang);
    }

    return slugSelector("/", normalizedLang);
  }

  const targets = Object.fromEntries(
    await Promise.all(
      enabledLanguages.map(async ({ languageCode }) => [
        languageCode,
        await resolveTargetForLang(languageCode),
      ]),
    ),
  );

  return targets as Record<string, string>;
}
