import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load environment variables from .env so CLI commands (npx prisma ...) can read DATABASE_URL
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
