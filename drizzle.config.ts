import type { Config } from "drizzle-kit";

export default {
  schema: "server/lib/db/schema.ts",
  out: "server/lib/migrations",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.KANDAGA_DRIZZLE_HOST!,
    password: process.env.KANDAGA_DRIZZLE_PASSWORD,
    user: process.env.KANDAGA_DRIZZLE_USERNAME,
    port: Number(process.env.KANDAGA_DRIZZLE_PORT),
    database: process.env.KANDAGA_DRIZZLE_DATABASE!,
  },
} satisfies Config;
