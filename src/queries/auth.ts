import { convexQuery, useConvexAuth } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";

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
