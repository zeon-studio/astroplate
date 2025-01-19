import type { ContentEntryMap } from "astro:content";

export type Certification = {
  logo: string;
  manufacturer: string;
  skill: string;
  description: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
