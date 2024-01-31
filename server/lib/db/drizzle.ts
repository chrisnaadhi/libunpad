import * as schema from "../db/drizzle";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.DRIZZLE_HOST,
  user: process.env.DRIZZLE_USERNAME,
  database: process.env.DRIZZLE_DATABASE,
  password: process.env.DRIZZLE_PASSWORD,
  port: Number(process.env.DRIZZLE_PORT),
});

export const db = drizzle(connection);
