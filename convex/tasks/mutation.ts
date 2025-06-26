import { v } from "convex/values";
import { protectedMutation } from "../functions";

export const create = protectedMutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.insert("tasks", {
      ...args,
      userId: ctx.user._id,
      completed: false,
    });
  },
});
