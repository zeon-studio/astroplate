import { z } from "zod";

const AboutSchema = z.object({
  title: z.string(),
  meta_title: z.string().optional(),
  description: z.string().optional(),
  image: z.string(),
  draft: z.boolean().optional(),
});

export default AboutSchema;
