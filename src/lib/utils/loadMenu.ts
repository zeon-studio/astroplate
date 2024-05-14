import fs from 'fs';
import path from 'path';

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
  const menuPath: string = path.join(process.cwd(), 'src', 'config', `menu.${lang}.json`);
  const menuData: string = fs.readFileSync(menuPath, 'utf-8');
  return JSON.parse(menuData) as Menu;
}
