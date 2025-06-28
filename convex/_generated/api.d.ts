/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as controllers_workosWebhooksController from "../controllers/workosWebhooksController.js";
import type * as env from "../env.js";
import type * as functions from "../functions.js";
import type * as http from "../http.js";
import type * as organisationDomains_internal_mutation from "../organisationDomains/internal/mutation.js";
import type * as organisations_internal_mutation from "../organisations/internal/mutation.js";
import type * as organisations_internal_query from "../organisations/internal/query.js";
import type * as organisations_table from "../organisations/table.js";
import type * as tasks_mutation from "../tasks/mutation.js";
import type * as tasks_query from "../tasks/query.js";
import type * as tasks_table from "../tasks/table.js";
import type * as types_index from "../types/index.js";
import type * as users_internal_action from "../users/internal/action.js";
import type * as users_internal_mutation from "../users/internal/mutation.js";
import type * as users_internal_query from "../users/internal/query.js";
import type * as users_query from "../users/query.js";
import type * as users_table from "../users/table.js";
import type * as users_utils from "../users/utils.js";
import type * as workos_action from "../workos/action.js";
import type * as workos_internal_action from "../workos/internal/action.js";
import type * as workos_webhooks_middleware from "../workos/webhooks/middleware.js";
import type * as workos_webhooks_organisations from "../workos/webhooks/organisations.js";
import type * as workos_webhooks_users from "../workos/webhooks/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "controllers/workosWebhooksController": typeof controllers_workosWebhooksController;
  env: typeof env;
  functions: typeof functions;
  http: typeof http;
  "organisationDomains/internal/mutation": typeof organisationDomains_internal_mutation;
  "organisations/internal/mutation": typeof organisations_internal_mutation;
  "organisations/internal/query": typeof organisations_internal_query;
  "organisations/table": typeof organisations_table;
  "tasks/mutation": typeof tasks_mutation;
  "tasks/query": typeof tasks_query;
  "tasks/table": typeof tasks_table;
  "types/index": typeof types_index;
  "users/internal/action": typeof users_internal_action;
  "users/internal/mutation": typeof users_internal_mutation;
  "users/internal/query": typeof users_internal_query;
  "users/query": typeof users_query;
  "users/table": typeof users_table;
  "users/utils": typeof users_utils;
  "workos/action": typeof workos_action;
  "workos/internal/action": typeof workos_internal_action;
  "workos/webhooks/middleware": typeof workos_webhooks_middleware;
  "workos/webhooks/organisations": typeof workos_webhooks_organisations;
  "workos/webhooks/users": typeof workos_webhooks_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
