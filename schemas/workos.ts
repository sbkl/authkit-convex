import { z } from "zod";

export const webhookTypeValueSchema = z.union([
  z.literal("organisations"),
  z.literal("users"),
]);

export const organisationDomainStatusValueSchema = z.union([
  z.literal("verified"),
  z.literal("pending"),
  z.literal("failed"),
]);
