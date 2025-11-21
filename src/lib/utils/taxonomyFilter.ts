// 移除 slugify 导入，直接比较原始值
const taxonomyFilter = (posts: any[], name: string, key: string) =>
  posts.filter((post) =>
    post.data[name].map((name: string) => name).includes(key),  // 直接使用原始名称
  );

export default taxonomyFilter;