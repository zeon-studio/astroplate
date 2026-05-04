import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const JSON_FOLDER = "./.json";
const BLOG_FOLDER = "src/content/blog";
const languages = JSON.parse(
  fs.readFileSync(new URL("../src/config/language.json", import.meta.url), "utf8"),
);
const localeByContentDir = new Map(
  languages.map(({ contentDir, languageCode }) => [contentDir, languageCode]),
);

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("-"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(file);
      const relativePath = path.relative(BLOG_FOLDER, filepath);
      const [contentDir, ...slugParts] = relativePath.split(path.sep);
      const slug = path
        .join("blog", ...slugParts)
        .replace(/\.[^/.]+$/, "")
        .replace(/\\/g, "/");
      const lang = localeByContentDir.get(contentDir);

      return {
        lang,
        group: "blog",
        slug: slug,
        frontmatter: data,
        content: content,
      };
    } else {
      return [];
    }
  });

  return getPaths.filter((page) => page?.lang && !page.frontmatter?.draft);
};

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // create json files
  fs.writeFileSync(
    `${JSON_FOLDER}/posts.json`,
    JSON.stringify(getData(BLOG_FOLDER, 2)),
  );

  // merger json files for search
  const postsPath = new URL(`../${JSON_FOLDER}/posts.json`, import.meta.url);
  const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
  const search = [...posts];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
} catch (err) {
  console.error(err);
}
