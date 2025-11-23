import { getSinglePage } from "@/lib/contentParser.astro";
import { slugify } from "@/lib/utils/textConverter";

export const getTaxonomy = async (collection, name) => {
  const singlePages = await getSinglePage(collection);
  const taxonomyPages = singlePages.map((page) => page.data[name]);
  let taxonomies = [];
  
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    
    if (categoryArray && Array.isArray(categoryArray)) {
        for (let j = 0; j < categoryArray.length; j++) {
            const rawValue = categoryArray[j];
            
            if (typeof rawValue === 'string' && rawValue.trim() !== "") {
                const slugifiedValue = slugify(rawValue);
                
                if (slugifiedValue && slugifiedValue.trim() !== "") {
                    taxonomies.push(slugifiedValue);
                }
            }
        }
    }
  }
  
  const taxonomy = [...new Set(taxonomies)].filter(item => item && item.trim() !== "");
  return taxonomy;
};

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
                const slugifiedValue = slugify(rawValue);
                
                if (slugifiedValue && slugifiedValue.trim() !== "") {
                    taxonomies.push(slugifiedValue);
                }
            }
        }
    }
  }
  return taxonomies.filter(item => item && item.trim() !== "");
};
