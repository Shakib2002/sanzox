import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        privacyPolicy: path.resolve(__dirname, "public/deep-focus/privacy-policy/index.html"),
        termsAndConditions: path.resolve(__dirname, "public/deep-focus/terms-and-conditions/index.html"),
      },
    },
  },
});