/// <reference types="vitest" />
// https://vitejs.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  //base: "/ols-react-challenge/", //github pages controled with window environment config
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts",
  },
  server: {
    proxy: {
      "^/v\\d+/.*": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      common: `${path.resolve(__dirname, "./src/common/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      routes: `${path.resolve(__dirname, "./src/routes")}`,
      router: `${path.resolve(__dirname, "./src/router")}`,
    },
  },
});
