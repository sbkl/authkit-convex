"use node";

import { v } from "convex/values";
import { publicAction } from "../functions";
import { internal } from "../_generated/api";
import { WorkOS } from "@workos-inc/node";
import { env } from "../env";

export const getSSOUrl = publicAction({
  args: {
    email: v.string(),
  },
  async handler(ctx, { email }) {
    const workos = new WorkOS(env.WORKOS_API_KEY);

    const organisation = await ctx.runQuery(
      internal.organisations.internal.query.findByEmail,
      {
        email,
      }
    );

    const ssoUrl = workos.userManagement.getAuthorizationUrl({
      clientId: env.WORKOS_CLIENT_ID,
      organizationId: organisation.externalId,
      redirectUri: env.WORKOS_SSO_REDIRECT_URI,
    });

    console.log(ssoUrl);

    return ssoUrl;
  },
});
