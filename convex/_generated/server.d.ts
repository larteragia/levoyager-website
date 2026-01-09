/* eslint-disable */
/**
 * Generated server types - will be replaced by `npx convex dev`
 */

import type {
  GenericMutationCtx,
  GenericQueryCtx,
  GenericActionCtx,
  FunctionReference,
} from "convex/server";
import type { DataModel } from "./dataModel";

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type ActionCtx = GenericActionCtx<DataModel>;

// Re-export mutation and query builders from convex/server
export { mutation, query, action, internalMutation, internalQuery, internalAction } from "convex/server";
