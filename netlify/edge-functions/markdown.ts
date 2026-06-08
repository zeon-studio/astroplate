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

  // Rewrite to the static .md file
  const mdUrl = new URL(req.url);
  mdUrl.pathname = mdPath;

  const mdResponse = await context.rewrite(mdUrl.toString());

  if (mdResponse && mdResponse.status === 200) {
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

  return context.next();
}

export const config = { path: "/*" };
