import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/cf-schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:dev.db", // Local development
  },
});
