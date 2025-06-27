import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../functions";
import { zodToConvex } from "convex-helpers/server/zod";
import { organisationDomainStatusValueSchema } from "../../../schemas/workos";

export const updateFromWorkos = internalMutation({
  args: {
    externalId: v.string(),
    status: zodToConvex(organisationDomainStatusValueSchema),
  },
  async handler(ctx, { externalId, status }) {
    const domain = await ctx.db
      .query("organisationDomains")
      .withIndex("externalId", (q) => q.eq("externalId", externalId))
      .first();

    if (domain === null) {
      throw new ConvexError("Domain not found");
    }

    await ctx.db.patch(domain._id, {
      status,
    });

    return domain._id;
  },
});
