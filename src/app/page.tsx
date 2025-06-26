"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppForm } from "@/components/ui/form";
import { LoadingDots } from "@/components/ui/loading-dots";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/queries/auth";
import { useCreateTask, useTaskList } from "@/queries/tasks";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import Link from "next/link";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export default function Home() {
  const { signOut } = useAuth();
  const { data: me } = useMe();
  const { data: tasks, isLoading: isTaskListLoading } = useTaskList();
  const createTask = useCreateTask(() => {
    form.reset();
  });
  const form = useAppForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (values) => {
      createTask.mutate({
        title: values.value.title,
        description: values.value.description,
      });
    },
  });
  return (
    <>
      <AuthLoading>
        <div className="w-full h-full flex items-center justify-center">
          <LoadingDots size="size-4" />
        </div>
      </AuthLoading>
      <Unauthenticated>
        <div className="w-full h-full flex items-center justify-center">
          <Link
            href="/auth"
            className="hover:underline hover:underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </Unauthenticated>
      <Authenticated>
        <div className="h-16 border-b w-full fixed top-0 left-0 right-0 flex items-center justify-between px-4 bg-white z-10">
          <span>Logged in as {me?.email}</span>
          <Button variant="outline" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
        <div className="pt-24 max-w-lg mx-auto flex flex-col gap-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e);
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create Task</CardTitle>
                <CardDescription>
                  Create a new task to help you stay on track.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 flex flex-col">
                <form.AppField
                  name="title"
                  children={(field) => (
                    <field.TextField
                      label="Title"
                      placeholder="Task title"
                      className="w-full"
                    />
                  )}
                />
                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.TextareaField
                      label="Description"
                      placeholder="Task description"
                      className="w-full"
                    />
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" loading={createTask.isPending}>
                  Create
                </Button>
              </CardFooter>
            </Card>
          </form>
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Here are your tasks.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 divide-y divide-border">
              {isTaskListLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="pb-4">
                    <Skeleton className="h-6 w-full rounded-md" />
                  </div>
                ))
              ) : !tasks?.length ? (
                <span className="text-sm text-muted-foreground">
                  No tasks found.
                </span>
              ) : (
                tasks?.map((task) => (
                  <div key={task._id} className="pb-4">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {task.description}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </Authenticated>
    </>
  );
}
