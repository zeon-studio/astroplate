import { z } from "zod";

const TestimonialSchema = z.object({
  name: z.string(),
  designation: z.string(),
  avatar: z.string(),
  content: z.string(),
});

const TestimonialsSchema = z.array(TestimonialSchema);

const CallToActionSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  image: z.string(),
  description: z.string(),
  button: z.object({
    enable: z.boolean(),
    label: z.string(),
    link: z.string().url(),
  }),
});

export const collections = {
  Testimonial: TestimonialSchema,
  Testimonials: TestimonialsSchema,
  CallToAction: CallToActionSchema,
};
