import type { MiddlewareHandler } from "astro";

const homepageLinks = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="describedby"; type="text/plain"',
  '</sitemap-index.xml>; rel="sitemap"',
];

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function toMarkdownUrl(requestUrl: URL): string {
  const path = requestUrl.pathname.replace(/\/$/, "") || "/";
  return `${requestUrl.origin}${path === "/" ? "/index.md" : `${path}.md`}`;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  const { pathname } = new URL(request.url);
  const accept = request.headers.get("Accept") ?? "";
  const wantsMarkdown = accept.includes("text/markdown");
  const wantsHtml = accept.includes("text/html");
  const normalizedPath = normalizePathname(pathname);
  const basePath = normalizePathname(import.meta.env.BASE_URL || "/");
  const isHomepage = normalizedPath === basePath;

  // Bypass non-page requests — UNLESS it's the homepage (needs Link headers)
  if (!wantsHtml && !wantsMarkdown && !isHomepage) return next();

  const requestUrl = new URL(request.url);
  const response = await next();

  // Feature 1: Markdown negotiation (agents requesting markdown)
  if (
    wantsMarkdown &&
    response.headers.get("Content-Type")?.includes("text/html") &&
    response.status === 200
  ) {
    try {
      const mdResponse = await fetch(toMarkdownUrl(requestUrl));
      if (mdResponse.ok) {
        const markdown = await mdResponse.text();
        const headers = new Headers(response.headers);
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        headers.delete("Content-Length");
        headers.set(
          "x-markdown-tokens",
          String(Math.ceil(markdown.split(/\s+/).length * 1.3)),
        );
        return new Response(markdown, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }
    } catch (e) {
      console.error("Markdown negotiation failed:", e);
    }
  }

  // Feature 2: Link headers on homepage
  if (isHomepage) {
    const headers = new Headers(response.headers);
    for (const link of homepageLinks) headers.append("Link", link);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};
