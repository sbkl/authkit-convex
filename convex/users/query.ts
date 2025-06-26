import { ConvexError } from "convex/values";
import { protectedQuery } from "../functions";

export const me = protectedQuery({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    const email = identity?.email;
    if (!email) throw new ConvexError("Not Authorised");
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();
  },
});
