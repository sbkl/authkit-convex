import { HttpRouterWithHono } from "convex-helpers/server/hono";
import type { HonoWithConvex } from "convex-helpers/server/hono";

import { Hono } from "hono";

import type { ActionCtx } from "./_generated/server";
import { workosWebhooksController } from "./controllers/workosWebhooksController";

const app: HonoWithConvex<ActionCtx> = new Hono();

app.route("/workos-webhooks", workosWebhooksController);

export default new HttpRouterWithHono(app);
