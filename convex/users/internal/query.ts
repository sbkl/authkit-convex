import { v } from "convex/values";
import { internalQuery } from "../../functions";

export const findByExternalId = internalQuery({
  args: {
    externalId: v.string(),
  },
  handler: async (ctx, { externalId }) => {
    return await ctx.db
      .query("users")
      .withIndex("externalId", (q) => q.eq("externalId", externalId))
      .first();
  },
});

export const findByEmail = internalQuery({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();
  },
});
