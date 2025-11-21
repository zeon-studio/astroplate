import { getSinglePage } from "@/lib/contentParser.astro";

// get taxonomy from frontmatter - 直接返回原始标签
export const getTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  
  // 直接返回原始标签
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    // 确保它是数组且非空
    if (categoryArray && Array.isArray(categoryArray)) {
      // 🌟 关键修复 1：严格过滤，只保留非空的字符串
      const validCategories = categoryArray.filter(item => typeof item === 'string' && item.trim() !== "");
      taxonomies = taxonomies.concat(validCategories);
    }
  }
  
  // 🌟 关键修复 2：在去重之后，再次确保没有产生意外的空值
  const taxonomy = [...new Set(taxonomies)].filter(item => item.trim() !== "");
  return taxonomy;
};

// get all taxonomies from frontmatter - 直接返回原始标签
export const getAllTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    if (categoryArray && Array.isArray(categoryArray)) {
      // 关键修复：严格过滤，只保留非空的字符串
      const validCategories = categoryArray.filter(item => typeof item === 'string' && item.trim() !== "");
      taxonomies = taxonomies.concat(validCategories);
    }
  }
  
  // 确保最终结果是干净的
  return taxonomies.filter(item => item.trim() !== "");
};
