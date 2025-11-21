import { getCollection } from "astro:content";

const BLOG_FOLDER = "blog";

try {
  // 使用 Astro Content Collections 替代文件系统读取
  const posts = await getCollection(BLOG_FOLDER, ({ data, id }) => 
    !data?.draft && !id.startsWith("-")
  );

  // 转换格式以保持兼容性
  const formattedPosts = posts.map(post => ({
    group: "blog",
    slug: post.id,
    frontmatter: post.data,
    content: post.body
  }));

  // 创建文件夹如果不存在
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // 创建json文件
  fs.writeFileSync(
    `${JSON_FOLDER}/posts.json`,
    JSON.stringify(formattedPosts),
  );

  // 合并json文件用于搜索
  const search = [...formattedPosts];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
} catch (err) {
  console.error(err);
}