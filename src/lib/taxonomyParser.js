import { getSinglePage } from "@/lib/contentParser.astro";

// get taxonomy from frontmatter
export const getTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  let taxonomies = [];
  
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    
    if (categoryArray && Array.isArray(categoryArray)) {
        for (let j = 0; j < categoryArray.length; j++) {
            const rawValue = categoryArray[j];
            
            // 🚀 修复：直接返回原始值，不进行 slugify
            if (typeof rawValue === 'string' && rawValue.trim() !== "") {
                taxonomies.push(rawValue);
            }
        }
    }
  }
  
  const taxonomy = [...new Set(taxonomies)].filter(item => item && item.trim() !== "");
  return taxonomy;
};

// get all taxonomies from frontmatter
export const getAllTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  let taxonomies = [];
  
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    
    if (categoryArray && Array.isArray(categoryArray)) {
        for (let j = 0; j < categoryArray.length; j++) {
            const rawValue = categoryArray[j];
            
            if (typeof rawValue === 'string' && rawValue.trim() !== "") {
                taxonomies.push(rawValue);
            }
        }
    }
  }
  return taxonomies.filter(item => item && item.trim() !== "");
};
