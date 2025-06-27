import { Table } from "convex-helpers/server";
import { zodToConvex } from "convex-helpers/server/zod";
import { v } from "convex/values";
import { organisationDomainStatusValueSchema } from "../../schemas/workos";

export const Organisations = Table("organisations", {
  name: v.string(),
  externalId: v.string(),
  metadata: v.optional(
    v.record(v.string(), v.union(v.string(), v.number(), v.null()))
  ),
});

export const OrganisationDomainBaseFields = {
  domain: v.string(),
  externalId: v.string(),
  status: zodToConvex(organisationDomainStatusValueSchema),
};

export const OrganisationDomains = Table("organisationDomains", {
  organisationId: v.id("organisations"),
  ...OrganisationDomainBaseFields,
});
