import { defineCollection, z } from "astro:content";

// 统一的通用字段定义，确保类型正确
const commonFields = {
  title: z.string(),
  description: z.string().optional(), // 页面描述
  meta_title: z.string().optional(), // SEO 标题
  date: z.date().optional(),
  // 关键：image 设为 optional，并保持 string 类型（适用于 /public/ 或 http 路径）
  image: z.string().optional(), 
  draft: z.boolean().default(true).optional(), // 是否为草稿
};

// --- Post collection schema (博客文章) ---
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});

// --- Author collection schema (作者) ---
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonFields,
    social: z
      .array(
        z.object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
        }).optional(),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// --- Pages collection schema (普通页面) ---
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonFields,
  }),
});

// --- About collection schema ---
const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonFields,
  }),
});

// --- Contact collection schema ---
const contactCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonFields,
  }),
});

// --- Homepage collection schema (主页内容) ---
const homepageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

// --- Sections 集合的子 schema ---

// CTA 集合的 Schema
const ctaSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  button: z.object({
    enable: z.boolean(),
    label: z.string(),
    link: z.string(),
  }),
});

// Testimonial 集合的 Schema
const testimonialSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  description: z.string(),
  testimonials: z.array(
    z.object({
      name: z.string(),
      avatar: z.string(),
      designation: z.string(),
      content: z.string(),
    }),
  ),
});

// Sections 集合定义。它必须匹配实际的文件夹名 'sections'
const sectionsCollection = defineCollection({
  type: 'content',
  // 使用 z.union 将 CTA 和 Testimonial 的结构合并为一个 Schema
  schema: z.union([ctaSchema, testimonialSchema]),
});


// Export collections
export const collections = {
  // Pages
  homepage: homepageCollection,
  blog: blogCollection,
  authors: authorsCollection,
  pages: pagesCollection,
  about: aboutCollection,
  contact: contactCollection,

  // 导出名为 'sections' 的集合
  sections: sectionsCollection,
};
