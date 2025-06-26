import { defineSchema } from "convex/server";
import { Users } from "./users/table";
import { Tasks } from "./tasks/table";

const schema = defineSchema({
  users: Users.table
    .index("externalId", ["externalId"])
    .index("email", ["email"]),
  tasks: Tasks.table.index("userId", ["userId"]),
});

export default schema;
