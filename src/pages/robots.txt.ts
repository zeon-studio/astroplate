import { siteConfig } from "@/lib/siteConfig";

function normalizeSiteUrl(rawUrl?: string) {
  if (!rawUrl) return undefined;

  const withProtocol = /^https?:\/\//.test(rawUrl)
    ? rawUrl
    : `https://${rawUrl}`;

  try {
    const url = new URL(withProtocol);
    return url.hostname === "example.com" ? undefined : url;
  } catch {
    return undefined;
  }
}

export function GET({ site }: { site?: URL }) {
  const siteUrl =
    site ||
    normalizeSiteUrl(siteConfig.site.base_url) ||
    new URL("http://localhost:4321/");
  const sitemapUrl = new URL("/sitemap-index.xml", siteUrl).toString();

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      "Disallow: /api/*",
      "",
      `Sitemap: ${sitemapUrl}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
