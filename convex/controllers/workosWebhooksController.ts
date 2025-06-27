import type { HonoWithConvex } from "convex-helpers/server/hono";
import type { ActionCtx } from "../_generated/server";
import { Hono } from "hono";
import { workosMiddleware } from "../middlewares/workos";
import { handleUserWebhooks } from "../workos/webhooks/users";
import { handleOrganisationWebhooks } from "../workos/webhooks/organisations";

const workosWebhooksController: HonoWithConvex<ActionCtx> = new Hono();

workosWebhooksController.post(
  "/users",
  workosMiddleware("users"),
  handleUserWebhooks
);

workosWebhooksController.post(
  "/organisations",
  workosMiddleware("organisations"),
  handleOrganisationWebhooks
);

export { workosWebhooksController };
