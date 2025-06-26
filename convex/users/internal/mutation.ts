import { v } from "convex/values";
import { internalMutation } from "../../functions";

export const upsertFromWorkos = internalMutation({
  args: {
    email: v.string(),
    externalId: v.string(),
    firstName: v.union(v.string(), v.null()),
    lastName: v.union(v.string(), v.null()),
    emailVerified: v.boolean(),
    verified: v.optional(v.string()),
  },
  async handler(
    ctx,
    { externalId, email, emailVerified, firstName, lastName }
  ) {
    // if (!email || !emailVerified) {
    //   throw new ConvexError("User email is required");
    // }
    const userAttributes = {
      firstName,
      lastName,
      email,
      externalId,
      emailVerified,
    };

    const user = await ctx.db
      .query("users")
      .withIndex("externalId", (q) => q.eq("externalId", externalId))
      .first();

    if (user === null) {
      return await ctx.db.insert("users", {
        ...userAttributes,
      });
    } else {
      return await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromWorkos = internalMutation({
  args: { workosUserId: v.string() },
  async handler(ctx, { workosUserId }) {
    const user = await ctx.db
      .query("users")
      .withIndex("externalId", (q) => q.eq("externalId", workosUserId))
      .first();

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for user ID: ${workosUserId}`
      );
    }
  },
});
