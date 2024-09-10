import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

import { customLogger } from "./utils/customLogger";
import { book, user } from "./app/router";

export const app = new Hono();

const versionPrefix = "/v1";

app.use(etag(), logger(customLogger));
app.route(versionPrefix, book);
app.route(versionPrefix, user);

app.get("/notfound", (c) => {
  return c.notFound();
});

export default {
  port: 3333,
  fetch: app.fetch,
};
