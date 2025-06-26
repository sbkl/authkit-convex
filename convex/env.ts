import { z } from "zod";

export const env = {
  WORKOS_API_KEY: z.string().parse(process.env.WORKOS_API_KEY, {
    path: ["WORKOS_API_KEY"],
  }),
  WORKOS_CLIENT_ID: z.string().parse(process.env.WORKOS_CLIENT_ID, {
    path: ["WORKOS_CLIENT_ID"],
  }),
  WORKOS_WEBHOOK_USERS_SECRET: z
    .string()
    .parse(process.env.WORKOS_WEBHOOK_USERS_SECRET, {
      path: ["WORKOS_WEBHOOK_USERS_SECRET"],
    }),
};
