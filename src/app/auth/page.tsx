import { AuthForm } from "@/components/auth/form";
import { WorkOS } from "@workos-inc/node";
import { z } from "zod";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default function AuthPage() {
  const googleOAuthUrl = workos.userManagement.getAuthorizationUrl({
    clientId: z.string().parse(process.env.WORKOS_CLIENT_ID),
    provider: "GoogleOAuth",
    redirectUri: "http://localhost:3000/api/auth/oauth",
  });

  return (
    <div className="h-full w-full">
      <AuthForm googleOAuthUrl={googleOAuthUrl} />
    </div>
  );
}
