import { env } from "./env";

export default {
  providers: [
    {
      type: "customJwt",
      applicationID: "convex",
      issuer: "https://api.workos.com",
      jwks: `https://api.workos.com/sso/jwks/${env.WORKOS_CLIENT_ID}`,
      algorithm: "RS256",
    },
  ],
};
