import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 60 * 1000,
    supportFile: false,
    baseUrl: "https://99-minutes-emails.vercel.app",
  },
});
