import { getSinglePage } from "@/lib/contentParser.astro";
import { slugify } from "@/lib/utils/textConverter"; // 确保这里的路径正确

// get taxonomy from frontmatter
export const getTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  let taxonomies = [];
  
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    
    // 确保 categoryArray 是一个数组，以防 frontmatter 格式错误
    if (categoryArray && Array.isArray(categoryArray)) {
        for (let j = 0; j < categoryArray.length; j++) {
            const rawValue = categoryArray[j];
            
            // 🌟 关键：在 slugify 之前，先过滤掉空值和非字符串值
            if (typeof rawValue === 'string' && rawValue.trim() !== "") {
                const slugifiedValue = slugify(rawValue);
                
                // 🌟 关键：如果 slugify 之后仍然是空字符串，则跳过
                if (slugifiedValue && slugifiedValue.trim() !== "") {
                    taxonomies.push(slugifiedValue);
                }
            }
        }
    }
  }
  
  const taxonomy = [...new Set(taxonomies)];
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
            
            // 🌟 关键：在 slugify 之前和之后进行严格过滤
            if (typeof rawValue === 'string' && rawValue.trim() !== "") {
                const slugifiedValue = slugify(rawValue);
                
                if (slugifiedValue && slugifiedValue.trim() !== "") {
                    taxonomies.push(slugifiedValue);
                }
            }
        }
    }
  }
  return taxonomies;
};
