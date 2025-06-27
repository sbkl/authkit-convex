import { v } from "convex/values";
import { internalMutation } from "../../functions";
import { Users } from "../table";

export const upsertFromWorkos = internalMutation({
  args: Users.withoutSystemFields,
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("externalId", (q) => q.eq("externalId", args.externalId))
      .first();

    if (user === null) {
      return await ctx.db.insert("users", args);
    } else {
      return await ctx.db.patch(user._id, args);
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
