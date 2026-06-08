function toMarkdownUrl(requestUrl: URL): string {
  const path = requestUrl.pathname.replace(/\/$/, "") || "/";
  return `${requestUrl.origin}${path === "/" ? "/index.md" : `${path}.md`}`;
}

export default async function handler(req: Request, context: any) {
  const accept = req.headers.get("Accept") ?? "";

  if (!accept.includes("text/markdown")) {
    return context.next();
  }

  const requestUrl = new URL(req.url);
  const mdUrl = toMarkdownUrl(requestUrl);

  try {
    const mdResponse = await fetch(mdUrl);
    if (mdResponse.ok) {
      const markdown = await mdResponse.text();
      return new Response(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": String(
            Math.ceil(markdown.split(/\s+/).length * 1.3),
          ),
          Vary: "Accept",
        },
      });
    }
  } catch (e) {
    console.error("Markdown edge function failed:", e);
  }

  return context.next();
}

export const config = { path: "/*" };
