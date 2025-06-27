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
    }
    await ctx.db.patch(user._id, args);

    return user._id;
  },
});

export const deleteFromWorkos = internalMutation({
  args: { externalId: v.string() },
  async handler(ctx, { externalId }) {
    const user = await ctx.db
      .query("users")
      .withIndex("externalId", (q) => q.eq("externalId", externalId))
      .first();

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for user ID: ${externalId}`
      );
    }
  },
});
