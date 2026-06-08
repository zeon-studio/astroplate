function toMarkdownPath(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/";
  return path === "/" ? "/index.md" : `${path}.md`;
}

export default async function handler(req: Request, context: any) {
  const accept = req.headers.get("Accept") ?? "";

  if (!accept.includes("text/markdown")) {
    return context.next();
  }

  const url = new URL(req.url);
  const mdPath = toMarkdownPath(url.pathname);

  // Use the same origin but fetch the static .md file directly
  const mdUrl = `${url.origin}${mdPath}`;

  try {
    const mdResponse = await fetch(mdUrl, {
      headers: { Accept: "text/plain" }, // avoid infinite loop
    });

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
