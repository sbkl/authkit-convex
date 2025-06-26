import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import {
  convexQuery,
  useConvexAuth,
  useConvexMutation,
} from "@convex-dev/react-query";
import { toast } from "sonner";

export function useTaskList() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const query = useQuery({
    ...convexQuery(
      api.tasks.query.list,
      isLoading || !isAuthenticated ? "skip" : {}
    ),
    placeholderData: (prev) => prev,
  });
  return query;
}

type CreateTaskArgs = typeof api.tasks.mutation.create._args;
type CreateTaskResponse = typeof api.tasks.mutation.create._returnType;

export function useCreateTask(onSuccess?: () => void) {
  const createTask = useMutation<CreateTaskResponse, Error, CreateTaskArgs>({
    mutationFn: useConvexMutation(api.tasks.mutation.create),
    onSettled() {
      onSuccess?.();
      toast.success("Task created!", {
        position: "top-right",
      });
    },
    onError() {
      toast.error("Quiz couldn't be started", {
        position: "top-right",
      });
    },
  });

  return createTask;
}
