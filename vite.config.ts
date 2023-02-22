import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "neoadmin-demo",
  build: {
    outDir: "./build",
  },
  resolve: {
    alias: {
      "@neoco/backoffice": path.resolve(__dirname, "../neoco-backoffice/"),
    },
  },
  plugins: [
    react(),
    {
      name: "singleHMR",
      handleHotUpdate({ modules }) {
        modules.map((m) => {
          m.importedModules = new Set();
          m.importers = new Set();
        });

        return modules;
      },
    },
    svgr(),
  ],
});
