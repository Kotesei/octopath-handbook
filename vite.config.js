import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    allowedHosts: ["octopathhandbook.com", "100.68.123.80"],
    host: ["localhost"],
  },
});
