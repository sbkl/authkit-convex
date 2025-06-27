import { defineSchema } from "convex/server";
import { Users } from "./users/table";
import { Tasks } from "./tasks/table";
import { OrganisationDomains, Organisations } from "./organisations/table";

const schema = defineSchema({
  users: Users.table
    .index("externalId", ["externalId"])
    .index("email", ["email"]),
  organisations: Organisations.table.index("externalId", ["externalId"]),
  organisationDomains: OrganisationDomains.table
    .index("organisationId", ["organisationId"])
    .index("externalId", ["externalId"])
    .index("domain", ["domain"]),
  tasks: Tasks.table.index("userId", ["userId"]),
});

export default schema;
