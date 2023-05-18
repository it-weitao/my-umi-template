import { defineConfig } from "umi";
import { routes } from "./routes";

export default defineConfig({
  routes,
  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
