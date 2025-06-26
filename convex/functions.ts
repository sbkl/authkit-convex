import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import {
  Rules,
  wrapDatabaseReader,
  wrapDatabaseWriter,
} from "convex-helpers/server/rowLevelSecurity";
import { ConvexError } from "convex/values";

import { DataModel, Doc } from "./_generated/dataModel";
import {
  action as baseAction,
  internalAction as baseInternalAction,
  internalMutation as baseInternalMutation,
  internalQuery as baseInternalQuery,
  mutation as baseMutation,
  query as baseQuery,
  QueryCtx,
} from "./_generated/server";
import { getCurrentUserOrThrow } from "./users/utils";
import { internal } from "./_generated/api";

async function rlsRules(ctx: QueryCtx) {
  const user = await getCurrentUserOrThrow(ctx);
  console.log("user", user);
  // insert rls rules here
  return {} satisfies Rules<QueryCtx, DataModel>;
}

export const publicQuery = customQuery(
  baseQuery,
  customCtx(async (ctx) => ctx)
);

export const protectedQuery = customQuery(
  baseQuery,
  customCtx(async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);
    return {
      ...ctx,
      db: wrapDatabaseReader(ctx, ctx.db, await rlsRules(ctx)),
      user,
    };
  })
);

export const internalQuery = customQuery(
  baseInternalQuery,
  customCtx(async (ctx) => ({ ...ctx }))
);

export const publicMutation = customMutation(
  baseMutation,
  customCtx(async (ctx) => ctx)
);

export const protectedMutation = customMutation(
  baseMutation,
  customCtx(async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);
    return {
      ...ctx,
      db: wrapDatabaseWriter(ctx, ctx.db, await rlsRules(ctx)),
      user,
    };
  })
);

export const internalMutation = customMutation(
  baseInternalMutation,
  customCtx(async (ctx) => {
    return {
      ...ctx,
    };
  })
);

export const publicAction = customAction(
  baseAction,
  customCtx(async (ctx) => ctx)
);

export const internalAction = customAction(
  baseInternalAction,
  customCtx(async (ctx) => ctx)
);

export const protectedAction = customAction(
  baseAction,
  customCtx(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Authentication required");
    const user = await ctx.runQuery(
      internal.users.internal.query.findByExternalId,
      {
        externalId: identity.subject,
      }
    );
    if (!user) throw new ConvexError("User not found");
    const finalUser = user as Doc<"users">;
    return {
      ...ctx,
      user: finalUser,
    };
  })
);
