// 相似文章
const similarItems = (currentItem: any, allItems: any[]) => {
  let categories: string[] = [];
  let tags: string[] = [];

  // 设置分类
  if (currentItem.data.categories && currentItem.data.categories.length > 0) {
    categories = currentItem.data.categories;
  }

  // 设置标签
  if (currentItem.data.tags && currentItem.data.tags.length > 0) {
    tags = currentItem.data.tags;
  }

  // 按分类过滤
  const filterByCategories = allItems.filter((item: any) =>
    categories.find((category) => 
      item.data.categories && item.data.categories.includes(category)
    ),
  );

  // 按标签过滤
  const filterByTags = allItems.filter((item: any) =>
    tags.find((tag) => 
      item.data.tags && item.data.tags.includes(tag)
    ),
  );

  // 合并过滤结果
  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])];

  // 排除当前文章
  const filterBySlug = mergedItems.filter(
    (item) => item.id !== currentItem.id,
  );

  return filterBySlug;
};

export default similarItems;