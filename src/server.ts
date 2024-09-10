import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

import { customLogger } from "./utils/customLogger";

export const app = new Hono();

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(etag(), logger(customLogger));

await client
  .connect()
  .then(() => customLogger("Database connected sucessfully"))
  .catch((err) => customLogger(err));

export const db = drizzle(client);

export default {
  port: 8080,
  fetch: app.fetch,
};
