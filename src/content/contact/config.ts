import { defineCollection, z } from "astro:content";

const contactCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  contact: contactCollection,
};
