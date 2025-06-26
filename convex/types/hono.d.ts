import { UserIdentity } from "convex/server";

import { Doc } from "../_generated/dataModel";
import { ActionCtx } from "../_generated/server";

declare module "hono" {
  interface ContextVariableMap {
    user: Doc<"users">;
  }
}
