import fs from "node:fs";
import path from "node:path";
import languages from "../src/config/language.json" with { type: "json" };

// Filter out the English language
const englishLang = languages.filter((item) => item.languageCode === "en");
const filterLangs = languages.filter((item) => item.languageCode !== "en");
const contentDir = "src/content";
const configDir = "src/config";
const i18nDir = "src/i18n";

// Update language.json to only include the English language
fs.writeFileSync(
  path.join(configDir, "language.json"),
  JSON.stringify(englishLang, null, 2),
);

// Remove content directories for languages other than English
filterLangs.forEach((lang) => {
  const langContentDir = path.join(contentDir, lang.contentDir);
  fs.rm(langContentDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Error deleting folder ${langContentDir}:`, err);
      return;
    }
    console.log(`Folder ${langContentDir} deleted successfully`);
  });
});

// Remove other menu.{lang}.json files except menu.en.json
fs.readdir(configDir, (err, files) => {
  if (err) {
    console.error("Error reading config directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file.startsWith("menu.") && file !== "menu.en.json") {
      const filePath = path.join(configDir, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
          return;
        }
        console.log(`File ${filePath} deleted successfully`);
      });
    }
  });
});

// Remove other language files from i18n folder except en.json
fs.readdir(i18nDir, (err, files) => {
  if (err) {
    console.error("Error reading i18n directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file !== "en.json") {
      const filePath = path.join(i18nDir, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
          return;
        }
        console.log(`File ${filePath} deleted successfully`);
      });
    }
  });
});

console.log("Cleanup completed.");
