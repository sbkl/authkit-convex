import { ConvexError, v } from "convex/values";
import { internalQuery } from "../../functions";
import { parse } from "tldts";

export const findByEmail = internalQuery({
  args: {
    email: v.string(),
  },
  async handler(ctx, { email }) {
    console.log("email", email);
    const parsedUrl = parse(email);
    const domain = parsedUrl.domain;
    console.log("domain", domain);

    if (!domain) {
      throw new ConvexError("Invalid email");
    }

    const organisationDomain = await ctx.db
      .query("organisationDomains")
      .withIndex("domain", (q) => q.eq("domain", domain))
      .first();

    if (!organisationDomain) {
      throw new ConvexError("No Domain not found");
    }

    console.log("organisationDomain", organisationDomain);

    const organisation = await ctx.db
      .query("organisations")
      .withIndex("by_id", (q) => q.eq("_id", organisationDomain.organisationId))
      .first();

    console.log("organisation", organisation);
    if (!organisation) {
      throw new ConvexError("Organisation not found");
    }

    return organisation;
  },
});
