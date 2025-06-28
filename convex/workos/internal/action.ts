"use node";

import { v } from "convex/values";

import { WorkOS } from "@workos-inc/node";
import { env } from "../../env";
import { internalAction } from "../../functions";

/**
 * Verify a WorkOS webhook event.
 * @param payload - The payload of the webhook event.
 * @param signature - The signature of the webhook event.
 * @param secret - The signing secret of the webhook event.
 * @returns The Event object of the verified webhook event.
 */
export const verifyWebhook = internalAction({
  args: {
    payload: v.string(),
    signature: v.string(),
    secret: v.string(),
  },
  handler: async (_ctx, { payload, signature, secret }) => {
    const workos = new WorkOS(env.WORKOS_API_KEY);
    return await workos.webhooks.constructEvent({
      payload: JSON.parse(payload),
      sigHeader: signature,
      secret,
    });
  },
});
