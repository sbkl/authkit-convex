import { ConvexError, v } from "convex/values";
import { internal } from "../../_generated/api";
import { internalAction } from "../../functions";
import { WorkOS } from "@workos-inc/node";
import { env } from "../../env";

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
