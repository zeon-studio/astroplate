// Maps an EmDash post entry to Astroplate's expected blog post shape

export function adaptPost(entry: any) {
  if (!entry) return null;

  // Handle both standard and snake_case field names for robustness
  const data = entry.data || {};

  return {
    id: entry.slug || data.slug,
    data: {
      title: data.title || "",
      description: data.description || data.excerpt || "",
      meta_title: data.meta_title || data.title || "",
      date: data.published_at || data.publishedAt || data.createdAt,
      image: data.featured_image?.src || data.featuredImage || "",
      author: data.author || "Admin",
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: data.status !== "published",
    },
    slug: entry.slug || data.slug,
    body: data.content || [],
    // Keep raw data available just in case
    _emdash: entry,
  };
}

// Adapt multiple posts at once
export function adaptPosts(entries: any[]) {
  if (!entries || !Array.isArray(entries)) return [];
  return entries
    .map(adaptPost)
    .filter((p): p is NonNullable<ReturnType<typeof adaptPost>> => p !== null);
}
