import { favicons } from "favicons";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, "../assets/cv-monogram.svg");

const response = await favicons(source, {
  appName: "Context Vault",
  appShortName: "CV",
  appDescription: "Persistent Memory for AI Agents",
  background: "#212121",
  theme_color: "#6d28d9",
  lang: "en",
  icons: {
    android: true,
    appleIcon: true,
    favicons: true,
    windows: false,
    yandex: false,
  },
});

mkdirSync("public", { recursive: true });

for (const image of response.images) {
  writeFileSync(join("public", image.name), image.contents);
  console.log(`Written public/${image.name}`);
}

for (const file of response.files) {
  writeFileSync(join("public", file.name), file.contents);
  console.log(`Written public/${file.name}`);
}

console.log("\nAdd these tags to index.html <head>:");
for (const tag of response.html) {
  console.log(tag);
}
