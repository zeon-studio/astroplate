import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    date: z.date().optional(),
    image: z.string().optional().default(""),
    categories: z.array(z.string()).default([]),
    author: z.string().default("Admin"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/authors" }),
  schema: z.object({
    title: z.string(),
    email: z.string().optional(),
    image: z.string().optional().default(""),
    description: z.string().optional().default(""),
    meta_title: z.string().optional().default(""),
    social: z
      .array(
        z.object({
          name: z.string(),
          icon: z.string(),
          link: z.string(),
        }),
      )
      .optional()
      .default([]),
  }),
});

const homepage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/homepage" }),
  schema: z.object({
    title: z.string().optional(),
    banner: z.any().optional(),
    features: z.array(z.any()).optional().default([]),
  }),
});

const sections = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/sections" }),
  schema: z.object({
    enable: z.boolean().optional().default(true),
    title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    button: z
      .object({
        enable: z.boolean().optional().default(false),
        label: z.string().optional(),
        link: z.string().optional(),
      })
      .optional(),
    testimonials: z.array(z.any()).optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }),
  schema: z.object({
    title: z.string().default(""),
    meta_title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    draft: z.boolean().default(false),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/contact" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  pages,
  authors,
  homepage,
  sections,
  about,
  contact,
};
