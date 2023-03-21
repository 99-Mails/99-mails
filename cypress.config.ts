import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 60 * 1000,
    supportFile: false,
  },
});
