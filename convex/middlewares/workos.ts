import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { internal } from "../_generated/api";
import { webhookTypeValueSchema } from "../../schemas/workos";

import { z } from "zod";
import { HttpHonoEnv } from "../types";

export const workosMiddleware = (
  type: z.infer<typeof webhookTypeValueSchema>
) =>
  createMiddleware<HttpHonoEnv>(
    async (ctx: Context<HttpHonoEnv>, next: Next) => {
      const request = ctx.req;
      const bodyText = await request.text();
      const sigHeader = String(request.header("workos-signature"));

      try {
        const result = await ctx.env.runAction(
          internal.workos.internal.action.verifyWebhook,
          {
            payload: bodyText,
            signature: sigHeader,
            type,
          }
        );
        ctx.set("workosEvent", result);
        await next();
      } catch (error) {
        console.error("Error verifying webhook event", error);
        return new Response("Signature Verification Error Occured", {
          status: 400,
        });
      }
    }
  );
