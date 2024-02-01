import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const runtimeConfig = useRuntimeConfig()

const connection = await mysql.createConnection({
  host: runtimeConfig.dbHost,
  user: runtimeConfig.dbUsername,
  database: runtimeConfig.dbName,
  password: runtimeConfig.dbPassword,
  port: Number(runtimeConfig.dbPort),
});

export const db = drizzle(connection);