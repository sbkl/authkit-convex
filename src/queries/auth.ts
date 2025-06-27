import { convexQuery, useConvexAuth } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { useAction } from "convex/react";
import { requestSignIn, signIn } from "@/lib/workos";

export function useMe() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const query = useQuery({
    ...convexQuery(
      api.users.query.me,
      isLoading || !isAuthenticated ? "skip" : {}
    ),
  });
  return query;
}

type GetSSOUrlArgs = typeof api.workos.action.getSSOUrl._args;
type GetSSOUrlResponse = typeof api.workos.action.getSSOUrl._returnType;

export function useGetSSOUrl() {
  const ssoUrlAction = useAction(api.workos.action.getSSOUrl);

  const getSSOUrl = useMutation<GetSSOUrlResponse, Error, GetSSOUrlArgs>({
    mutationFn: ssoUrlAction,
  });

  return getSSOUrl;
}

type RequestSignInArgs = { email: string };
type RequestSignInResponse = { ok: boolean };

export function useRequestSignIn() {
  const requestSignInMutation = useMutation<
    RequestSignInResponse,
    Error,
    RequestSignInArgs
  >({
    mutationFn: requestSignIn,
  });

  return requestSignInMutation;
}

type SignInArgs = { email: string; code: string };
type SignInResponse = { ok: boolean };

export function useSignIn() {
  const requestSignInMutation = useMutation<SignInResponse, Error, SignInArgs>({
    mutationFn: signIn,
  });

  return requestSignInMutation;
}
