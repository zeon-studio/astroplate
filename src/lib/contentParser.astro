---
import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

type PageData = {
  title: string;
  meta_title?: string;
  description?: string;
  image?: string;
  draft?: boolean;
};

export const getSinglePage = async <C extends CollectionKey>(
  collectionName: C
): Promise<CollectionEntry<C>[]> => {
  const allPages = await getCollection(collectionName);

  const removeIndex = allPages.filter((data) => data.id.match(/^(?!-)/));

  const removeDrafts = removeIndex.filter((data) => {
    const pageData = data.data as PageData;
    return pageData.draft !== true;
  });

  return removeDrafts;
};
---
