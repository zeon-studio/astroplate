const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./.json";
const BLOG_FOLDER = "src/content/blog";

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(path.join(folder));
  const removeIndex = getPath.filter((item) => item.match(/^(?!-)/));

  const getPaths = removeIndex.map((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(path.join(folder, filename), "utf-8");
      const { data } = matter(file);
      const content = matter(file).content;
      const removeExtension = filepath.replace(/\.[^/.]+$/, "");
      const slug = data.slug
        ? data.slug
        : removeExtension
            .split("/")
            .slice(CONTENT_DEPTH, removeExtension.split("/").length)
            .join("/");

      const group = removeExtension.split("/")[Number(groupDepth)];

      return {
        group: group,
        slug: slug,
        frontmatter: data,
        content: content,
      };
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );
  return publishedPages;
};

// flatten nested arrays
const flatten = (arr) => {
  return arr.reduce((result, element) => {
    if (Array.isArray(element)) {
      result.push(...flatten(element));
    } else {
      result.push(element);
    }
    return result;
  }, []);
};

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // create json files
  fs.writeFileSync(
    `${JSON_FOLDER}/posts.json`,
    JSON.stringify(flatten(getData(BLOG_FOLDER, 2))),
  );

  // merger json files for search
  const posts = require(`../${JSON_FOLDER}/posts.json`);
  const search = [...posts];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
} catch (err) {
  console.error(err);
}
