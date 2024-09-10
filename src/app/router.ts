import { Hono } from "hono";

export const book = new Hono();
book.get("/123", (c) => c.text("List Books"));

export const user = new Hono().basePath('/user')
user.get("/detail", (c) => c.text("User Detail"));