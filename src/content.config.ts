// src/content/config.ts

import { glob } from "@astrojs/content"; // <-- 关键修正：从 @astrojs/content 导入 glob
import { defineCollection, z } from "astro:content";

// 统一的通用字段定义，确保类型正确
const commonFields = {
  title: z.string(),
  description: z.string().optional(), // description 设为 optional 更安全
  meta_title: z.string().optional(),
  date: z.date().optional(),
  // 关键：image 设为 optional，并保持 string 类型
  image: z.string().optional(), 
  draft: z.boolean().default(true).optional(), // draft 设为 optional 且默认 true 更安全
};

// --- Post collection schema (博客文章) ---
const blogCollection = defineCollection({
  // loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }), // Astro v3.x/v4.x+ 不需要手动指定 loader
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
  // loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
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
  // loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  type: 'content',
  schema: z.object({
    ...commonFields,
  }),
});

// --- About collection schema ---
const aboutCollection = defineCollection({
  // loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  type: 'content',
  schema: z.object({
    ...commonFields,
  }),
});

// --- Contact collection schema ---
const contactCollection = defineCollection({
  // loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  type: 'content',
  schema: z.object({
    ...commonFields,
  }),
});

// --- Homepage collection schema (主页内容) ---
const homepageCollection = defineCollection({
  // loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
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

// --- Call to Action collection schema ---
const ctaSectionCollection = defineCollection({
  // loader: glob({ pattern: "call-to-action.{md,mdx}", base: "src/content/sections" }),
  type: 'content',
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// --- Testimonials Section collection schema ---
const testimonialSectionCollection = defineCollection({
  // loader: glob({ pattern: "testimonial.{md,mdx}", base: "src/content/sections" }),
  type: 'content',
  schema: z.object({
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
  }),
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

  // sections
  ctaSection: ctaSectionCollection,
  testimonialSection: testimonialSectionCollection,
};
