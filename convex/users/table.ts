import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const Users = Table("users", {
  email: v.string(),
  externalId: v.string(),
  firstName: v.union(v.string(), v.null()),
  lastName: v.union(v.string(), v.null()),
  emailVerified: v.boolean(),
  profilePictureUrl: v.optional(v.union(v.string(), v.null())),
});
