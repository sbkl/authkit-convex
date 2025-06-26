import { v } from "convex/values";

import { Table } from "convex-helpers/server";

export const Tasks = Table("tasks", {
  title: v.string(),
  description: v.string(),
  completed: v.boolean(),
  userId: v.id("users"),
});
