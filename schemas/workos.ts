import { z } from "zod";

export const webhookTypeValueSchema = z.union([
  z.literal("emails"),
  z.literal("users"),
]);
