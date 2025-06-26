import { z } from "zod";

export const env = {
  EMAIL_FROM: z
    .string()
    .email()
    .parse(process.env.EMAIL_FROM, {
      path: ["EMAIL_FROM"],
    }),
  JWKS_URL: z.string().parse(process.env.JWKS_URL, {
    path: ["JWKS_URL"],
  }),
  RESEND_API_KEY: z.string().parse(process.env.RESEND_API_KEY, {
    path: ["RESEND_API_KEY"],
  }),
  WORKOS_ISSUER_URL: z.string().parse(process.env.WORKOS_ISSUER_URL, {
    path: ["WORKOS_ISSUER_URL"],
  }),
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
