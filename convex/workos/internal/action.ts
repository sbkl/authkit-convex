"use node";

import { ConvexError, v } from "convex/values";

import { WorkOS } from "@workos-inc/node";
import { env } from "../../env";
import { zodToConvex } from "convex-helpers/server/zod";
import { webhookTypeValueSchema } from "../../../schemas/workos";
import { internalAction } from "../../functions";

export const verifyWebhook = internalAction({
  args: {
    payload: v.string(),
    signature: v.string(),
    type: zodToConvex(webhookTypeValueSchema),
  },
  handler: async (_ctx, { payload, signature, type }) => {
    const workos = new WorkOS(env.WORKOS_API_KEY);
    const secret =
      type === "users"
        ? env.WORKOS_WEBHOOK_USERS_SECRET
        : type === "organisations"
          ? env.WORKOS_WEBHOOK_ORGANISATIONS_SECRET
          : null;

    if (!secret) {
      throw new ConvexError("Webhook type is not supported");
    }

    return await workos.webhooks.constructEvent({
      payload: JSON.parse(payload),
      sigHeader: signature,
      secret,
    });
  },
});
