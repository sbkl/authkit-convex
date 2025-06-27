"use node";

import { ConvexError, v } from "convex/values";

import { WorkOS } from "@workos-inc/node";
import { env } from "../../env";
import { zodToConvex } from "convex-helpers/server/zod";
import { webhookTypeValueSchema } from "../../../schemas/workos";
import { internalAction } from "../../functions";
import { internal } from "../../_generated/api";

export const verifyWebhook = internalAction({
  args: {
    payload: v.string(),
    signature: v.string(),
    type: zodToConvex(webhookTypeValueSchema),
  },
  handler: async (_ctx, { payload, signature, type }) => {
    const workos = new WorkOS(env.WORKOS_API_KEY);
    const secret = type === "users" ? env.WORKOS_WEBHOOK_USERS_SECRET : null;

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

export const upsertFromWorkos = internalAction({
  args: {
    externalId: v.string(),
  },
  async handler(ctx, { externalId }) {
    const workos = new WorkOS(env.WORKOS_API_KEY);
    const workosUser = await workos.userManagement.getUser(externalId);

    if (!workosUser) {
      throw new ConvexError("workosUser not found");
    }

    await ctx.runMutation(internal.users.internal.mutation.upsertFromWorkos, {
      externalId: workosUser.id,
      email: workosUser.email,
      emailVerified: workosUser.emailVerified,
      firstName: workosUser.firstName,
      lastName: workosUser.lastName,
      profilePictureUrl: workosUser.profilePictureUrl,
    });
  },
});
