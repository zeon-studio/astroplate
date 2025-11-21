import { getSinglePage } from "@/lib/contentParser.astro";

// get taxonomy from frontmatter - 直接返回原始标签
export const getTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  
  // 直接返回原始标签
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    if (categoryArray && Array.isArray(categoryArray)) {
      // 关键修复 1：在合并之前过滤掉所有空字符串和非字符串值
      const validCategories = categoryArray.filter((item) => typeof item === 'string' && item.trim() !== "");
      taxonomies = taxonomies.concat(validCategories);
    }
  }
  
  const taxonomy = [...new Set(taxonomies)];
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
      // 关键修复 2：在合并之前过滤掉所有空字符串和非字符串值
      const validCategories = categoryArray.filter((item) => typeof item === 'string' && item.trim() !== "");
      taxonomies = taxonomies.concat(validCategories);
    }
  }
  
  return taxonomies;
};
