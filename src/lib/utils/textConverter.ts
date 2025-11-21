import { marked } from "marked";
import realSlugify from "slugify"; 

// slugifyTitle - 修复配置，移除 strict: true
export const slugifyTitle = (title) => {
  if (!title) return "";
  
  // 核心修复：移除 strict: true，并调整 remove 选项以兼容更多字符
  return realSlugify(title, {
    lower: true,
    locale: 'zh',
    // 允许所有字符，只移除常见的标点符号
    remove: /[*+~.()'"!:@,]/g 
  });
};

// slugify - 保持原名，但调用 slugifyTitle (为了兼容性)
export const slugify = slugifyTitle; 


// markdownify
export const markdownify = (content, div) => {
  if (!content) return ""; 
  // 确保 div 为布尔值
  return div ? marked.parse(content) : marked.parseInline(content || '');
};

// humanize
export const humanize = (content) => {
  if (!content) return "";
  // 确保只处理字符串
  if (typeof content !== 'string') return "";
  
  // 修复：先将 slug 中的连字符转为空格，然后 humanize
  return content
    .replace(/^[-\s]+|[-\s]+$/g, "") // 移除开头和结尾的连字符或空格
    .replace(/[-\s]+/g, " ")       // 将所有连字符和空格转换为单个空格
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content) => {
  if (!content) return "";
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content) => {
  if (!content) return "";
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
