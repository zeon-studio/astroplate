import fs from "fs";
import path from "path";
import languages from "@/config/language.json";

export interface ChildNavigationLink {
  name: string;
  url: string;
}

export interface NavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: ChildNavigationLink[];
}

interface Menu {
  main: NavigationLink[];
  footer: NavigationLink[];
}

export function loadMenu(lang: string): Menu {
  // Find the language object based on the language code
  const language = languages.find((l) => l.languageCode === lang);

  if (!language) {
    throw new Error(
      `Language '${lang}' not found in the list of supported languages.`,
    );
  }

  // Load menu data based on the language code
  const menuPath: string = path.join(
    process.cwd(),
    "src",
    "config",
    `menu.${language.languageCode}.json`,
  );
  const menuData: string = fs.readFileSync(menuPath, "utf-8");
  return JSON.parse(menuData) as Menu;
}
