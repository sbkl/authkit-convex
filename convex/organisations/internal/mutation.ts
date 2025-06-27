import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../functions";
import { OrganisationDomainBaseFields, Organisations } from "../table";

export const upsertFromWorkos = internalMutation({
  args: {
    ...Organisations.withoutSystemFields,
    domains: v.optional(
      v.array(
        v.object({
          ...OrganisationDomainBaseFields,
        })
      )
    ),
  },
  async handler(ctx, args) {
    const { domains, ...organisationArgs } = args;
    const organisation = await ctx.db
      .query("organisations")
      .withIndex("externalId", (q) =>
        q.eq("externalId", organisationArgs.externalId)
      )
      .first();

    if (organisation === null) {
      const organisationId = await ctx.db.insert(
        "organisations",
        organisationArgs
      );
      for (const domain of domains ?? []) {
        await ctx.db.insert("organisationDomains", {
          ...domain,
          organisationId,
        });
      }

      return organisationId;
    }

    await ctx.db.patch(organisation._id, organisationArgs);

    const existingDomains = await ctx.db
      .query("organisationDomains")
      .withIndex("organisationId", (q) =>
        q.eq("organisationId", organisation._id)
      )
      .collect();

    for (const domain of existingDomains) {
      if (!domains?.some((d) => d.domain === domain.domain)) {
        await ctx.db.delete(domain._id);
      }
      if (domains?.some((d) => d.domain === domain.domain)) {
        await ctx.db.patch(domain._id, {
          ...domain,
          organisationId: organisation._id,
        });
      }
    }

    for (const domain of domains ?? []) {
      if (!existingDomains.some((d) => d.domain === domain.domain)) {
        await ctx.db.insert("organisationDomains", {
          ...domain,
          organisationId: organisation._id,
        });
      }
    }

    return organisation._id;
  },
});

export const deleteFromWorkos = internalMutation({
  args: {
    externalId: v.string(),
  },
  async handler(ctx, { externalId }) {
    const organisation = await ctx.db
      .query("organisations")
      .withIndex("externalId", (q) => q.eq("externalId", externalId))
      .first();

    if (!organisation) {
      throw new ConvexError("Organisation not found");
    }

    const domains = await ctx.db
      .query("organisationDomains")
      .withIndex("organisationId", (q) =>
        q.eq("organisationId", organisation._id)
      )
      .collect();

    for (const domain of domains) {
      await ctx.db.delete(domain._id);
    }

    // TODO: Delete all documents including users related to the organisation

    await ctx.db.delete(organisation._id);
  },
});
