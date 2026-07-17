import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "node-server",
    cloudflare: false,
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
