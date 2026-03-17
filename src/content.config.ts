import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.string().optional(),
  draft: z.boolean(),
};

// Post collection schema
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    ...commonFields,
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(() => ["others"]),
    tags: z.array(z.string()).default(() => ["others"]),
    draft: z.boolean().optional(),
  }),
});

// Author collection schema
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
  schema: z.object({
    ...commonFields,
    email: z.string().optional(),
    image: z.string().optional(),
    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
  }),
});

// about collection schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    ...commonFields,
    role: z.string().optional(),
    social: z
      .array(
        z.object({
          name: z.string(),
          icon: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
    members: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          image: z.string().optional(),
          bio: z.string().optional(),
          social: z
            .array(
              z.object({
                name: z.string(),
                icon: z.string(),
                link: z.string(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
  }),
});

// faq collection schema
const faqCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/faq" }),
  schema: z.object({
    ...commonFields,
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default(() => []),
  }),
});

// contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
  }),
});

// services collection schema
const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/services" }),
  schema: z.object({
    ...commonFields,
    services: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          image: z.string().optional(),
          bulletpoints: z.array(z.string()),
        }),
      )
      .default(() => []),
  }),
});

// resources collection schema
const resourcesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/other-resources",
  }),
  schema: z.object({
    ...commonFields,
    links: z
      .array(
        z.object({
          category: z.string(),
          items: z.array(
            z.object({
              name: z.string(),
              url: z.string(),
              description: z.string(),
            }),
          ),
        }),
      )
      .default(() => []),
  }),
});

// remote-viewing collection schema
const remoteViewingCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/remote-viewing",
  }),
  schema: z.object({
    ...commonFields,
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          image: z.string().optional(),
          bulletpoints: z.array(z.string()),
        }),
      )
      .default(() => []),
  }),
});

// numerology collection schema
const numerologyCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/numerology",
  }),
  schema: z.object({
    ...commonFields,
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          image: z.string().optional(),
          bulletpoints: z.array(z.string()),
        }),
      )
      .default(() => []),
  }),
});

// energy-reading collection schema
const energyReadingCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/energy-reading",
  }),
  schema: z.object({
    ...commonFields,
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          image: z.string().optional(),
          bulletpoints: z.array(z.string()),
        }),
      )
      .default(() => []),
  }),
});

// energy-healing collection schema
const energyHealingCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/energy-healing",
  }),
  schema: z.object({
    ...commonFields,
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          image: z.string().optional(),
          bulletpoints: z.array(z.string()),
        }),
      )
      .default(() => []),
  }),
});

// shop collection schema
const shopCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/shop" }),
  schema: z.object({
    ...commonFields,
    products: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          image: z.string().optional(),
          price: z.string(),
          icon: z.string().optional(),
        }),
      )
      .default(() => []),
  }),
});

// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      image_dark: z.string().optional(),
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
        button2: z
          .object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          })
          .optional(),
      }),
    ),
  }),
});

// Call to Action collection schema
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "*/call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
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

// Testimonials Section collection schema
const testimonialSectionCollection = defineCollection({
  loader: glob({
    pattern: "*/testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
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
  faq: faqCollection,
  contact: contactCollection,
  services: servicesCollection,
  resources: resourcesCollection,
  "remote-viewing": remoteViewingCollection,
  numerology: numerologyCollection,
  "energy-reading": energyReadingCollection,
  "energy-healing": energyHealingCollection,
  shop: shopCollection,

  // sections
  ctaSection: ctaSectionCollection,
  testimonialSection: testimonialSectionCollection,
};
