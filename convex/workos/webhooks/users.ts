import { ConvexError } from "convex/values";
import { Context } from "hono";

import { internal } from "../../_generated/api";
import { HttpHonoEnv } from "../../types";

export async function handleUserWebhooks(ctx: Context<HttpHonoEnv>) {
  const event = ctx.var.workosEvent;

  try {
    switch (event.event) {
      case "user.created": // intentional fallthrough
      case "user.updated":
        await ctx.env.runMutation(
          internal.users.internal.mutation.upsertFromWorkos,
          {
            externalId: event.data.id,
            email: event.data.email,
            emailVerified: event.data.emailVerified,
            firstName: event.data.firstName,
            lastName: event.data.lastName,
            profilePictureUrl: event.data.profilePictureUrl,
          }
        );
        break;
      case "authentication.magic_auth_succeeded":
      case "authentication.oauth_succeeded":
        const externalId = event.data.userId;
        if (!externalId) {
          throw new ConvexError("User ID is required");
        }
        await ctx.env.runAction(
          internal.workos.internal.action.upsertFromWorkos,
          {
            externalId,
          }
        );
        break;
      case "user.deleted": {
        const workosUserId = event.data.id!;
        await ctx.env.runMutation(
          internal.users.internal.mutation.deleteFromWorkos,
          {
            workosUserId,
          }
        );
        break;
      }
      default:
        throw new ConvexError("Unsupported Clerk webhook event");
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error occured", error);
    return new Response("Auth Webhook Error", {
      status: 400,
    });
  }
}
