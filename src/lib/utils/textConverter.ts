import { slug } from "github-slugger";
import { marked } from "marked";

// 修复中文slugify函数
export const slugify = (content: string) => {
  if (!content) return "";
  
  // 如果是中文，使用自定义slugify
  if (/[\u4e00-\u9fa5]/.test(content)) {
    return content
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // 空格替换为连字符
      .replace(/[^\w\u4e00-\u9fa5\-]+/g, "") // 保留中文和单词字符
      .replace(/\-\-+/g, "-") // 合并多个连字符
      .replace(/^-+/, "") // 移除开头的连字符
      .replace(/-+$/, ""); // 移除结尾的连字符
  }
  
  // 英文内容使用原来的github-slugger
  return slug(content);
};

// 其他函数保持不变...
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const plainify = (content: string) => {
  const parseMarkdown: any = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};