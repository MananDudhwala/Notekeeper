import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      include: ["**/*.{jpg,jpeg,png,gif,svg,woff,woff2,eot,ttf,otf}"],
    }),
  ],
  base: process.env.VITE_BASE_PATH
});
