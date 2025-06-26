import { protectedQuery } from "../functions";

export const list = protectedQuery({
  args: {},
  async handler(ctx) {
    return await ctx.db
      .query("tasks")
      .withIndex("userId", (q) => q.eq("userId", ctx.user._id))
      .collect();
  },
});
