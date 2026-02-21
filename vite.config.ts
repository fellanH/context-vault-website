import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { cmsPlugin } from "./src/cms-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), cmsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
