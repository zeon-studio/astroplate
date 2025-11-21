import { marked } from "marked";
import slugify from "slugify"; // <-- 导入外部库

// slugifyTitle - 使用外部库来处理中文
export const slugifyTitle = (title) => {
  if (!title) return "";
  
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'zh', // 确保启用中文拼音转换支持
    remove: /[*+~.()'"!:@]/g // 可选：移除更多不常用的特殊字符
  });
};

// slugify - 保持原名，但调用 slugifyTitle (为了兼容性)
export const slugify = slugifyTitle;


// markdownify
export const markdownify = (content, div) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// humanize
export const humanize = (content) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content) => {
  const parseMarkdown = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities) => {
  let entityList = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity) => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
