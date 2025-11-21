import { getSinglePage } from "@/lib/contentParser.astro";

// get taxonomy from frontmatter - 直接返回原始标签
export const getTaxonomy = async (collection: any, name: string) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page: any) => page.data[name]);
  
  // 直接返回原始标签
  let taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    if (categoryArray && Array.isArray(categoryArray)) {
      // 🌟 关键修复 1：在合并之前过滤掉所有空字符串和非字符串值
      const validCategories = categoryArray.filter((item: any): item is string => typeof item === 'string' && item.trim() !== "");
      taxonomies = taxonomies.concat(validCategories);
    }
  }
  
  const taxonomy = [...new Set(taxonomies)];
  return taxonomy;
};

// get all taxonomies from frontmatter - 直接返回原始标签
export const getAllTaxonomy = async (collection: any, name: string) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page: any) => page.data[name]);
  
  let taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    if (categoryArray && Array.isArray(categoryArray)) {
      // 🌟 关键修复 2：在合并之前过滤掉所有空字符串和非字符串值
      const validCategories = categoryArray.filter((item: any): item is string => typeof item === 'string' && item.trim() !== "");
      taxonomies = taxonomies.concat(validCategories);
    }
  }
  
  return taxonomies;
};
