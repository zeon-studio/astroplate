import { defineCollection, z } from "astro:content";

// Banner schema
const bannerSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string(),
  button: z.object({
    enable: z.boolean(),
    label: z.string(),
    link: z.string(),
  }),
});

// Features schema
const featureSchema = z.object({
  title: z.string(),
  image: z.string(),
  content: z.string(),
  bulletpoints: z.array(z.string()),
  button: z.object({
    enable: z.boolean(),
    label: z.string().optional(),
    link: z.string().optional(),
  }),
});

// Main content schema
const contentSchema = z.object({
  banner: bannerSchema,
  features: z.array(featureSchema),
});

// Define the collection
const contentCollection = defineCollection({
  schema: contentSchema,
});

// Export collections
export const collections = {
  content: contentCollection,
};
