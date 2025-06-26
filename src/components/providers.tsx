"use client";

import * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ConvexQueryClient } from "@convex-dev/react-query";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import {
  AuthKitProvider,
  useAccessToken,
  useAuth,
} from "@workos-inc/authkit-nextjs/components";

function makeQueryClient() {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexQueryClient = new ConvexQueryClient(convex);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        staleTime: 60 * 1000,
      },
    },
  });
  convexQueryClient.connect(queryClient);
  return { queryClient, convex };
}

let browserQueryClient:
  | { queryClient: QueryClient; convex: ConvexReactClient }
  | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const { queryClient, convex } = getQueryClient();
  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        <AuthKitProvider>
          <ConvexProviderWithAuth client={convex} useAuth={useWorkosConvexAuth}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ConvexProviderWithAuth>
        </AuthKitProvider>
      </NextThemesProvider>
    </>
  );
}

function useWorkosConvexAuth() {
  const {
    accessToken,
    loading: accessTokenLoading,
    refresh,
  } = useAccessToken();
  const { user, loading } = useAuth();

  const fetchAccessToken = React.useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (accessTokenLoading || loading) return null;
      if (!accessToken && forceRefreshToken) {
        return (await refresh()) ?? null;
      }
      return accessToken ?? null;
    },
    [accessToken, accessTokenLoading, loading]
  );

  return React.useMemo(
    () => ({
      isLoading: loading || accessTokenLoading,
      isAuthenticated: Boolean(user),
      fetchAccessToken,
    }),
    [loading, accessTokenLoading, user, fetchAccessToken]
  );
}
