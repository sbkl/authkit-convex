"use client";

import { ConvexError } from "convex/values";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/form";
import { OTPInput } from "@/components/ui/otp-input";
import { useRouter } from "next/navigation";

import { useAuth } from "@workos-inc/authkit-nextjs/components";

import { Icon } from "../ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader } from "../ui/card";

import { useGetSSOUrl, useRequestSignIn, useSignIn } from "@/queries/auth";

export function AuthForm({ googleOAuthUrl }: AuthFormProps) {
  return (
    <div className="h-full w-full max-w-md space-y-6 mx-auto pt-48">
      <Tabs defaultValue="personal" className="w-full">
        <Card>
          <CardHeader>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="sso">SSO</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="personal">
              <PersonalAccountForm googleOAuthUrl={googleOAuthUrl} />
            </TabsContent>
            <TabsContent value="sso">
              <SingleSignOnForm />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

const emailFormSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
});

const codeFormSchema = emailFormSchema.extend({
  code: z.string().length(6, "Invalid code"),
});

interface AuthFormProps {
  googleOAuthUrl: string;
}

export function PersonalAccountForm({ googleOAuthUrl }: AuthFormProps) {
  const router = useRouter();
  const [step, setStep] = React.useState<"email" | "code">("email");
  const [redirecting, setRedirecting] = React.useState(false);
  const { refreshAuth } = useAuth();
  const otpFieldRef = React.useRef<React.ComponentRef<typeof OTPInput>>(null);
  const requestSignIn = useRequestSignIn();
  const signIn = useSignIn();
  const codeForm = useAppForm({
    defaultValues: {
      email: "",
      code: "",
    },
    validators: {
      onSubmit: codeFormSchema,
    },
    onSubmit: async (values) => {
      try {
        otpFieldRef.current?.blur();
        await signIn.mutateAsync({
          email: values.value.email.toLowerCase(),
          code: values.value.code,
        });
        toast.success("Your account has been verified", {
          position: "top-right",
        });
        setRedirecting(true);
        await refreshAuth();
        router.push("/");
      } catch (error) {
        codeForm.fieldInfo.code.instance?.setErrorMap({
          onSubmit: "Code could not be verified",
        });
      }
    },
  });
  const emailForm = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: emailFormSchema,
    },
    onSubmit: async (values) => {
      try {
        await requestSignIn.mutateAsync({
          email: values.value.email.toLowerCase(),
        });
        codeForm.setFieldValue("email", values.value.email.toLowerCase());
        setStep("code");
        toast.success("Code sent to email", {
          position: "top-right",
        });
      } catch (error) {
        if (error instanceof ConvexError) {
          if (step === "email") {
            emailForm.fieldInfo.email.instance?.setErrorMap({
              onSubmit: "Invalid email",
            });
          } else {
            codeForm.fieldInfo.code.instance?.setErrorMap({
              onSubmit: "Code could not be resent",
            });
          }
        }
        if (step === "email") {
          emailForm.fieldInfo.email.instance?.setErrorMap({
            onSubmit: "Invalid email",
          });
        } else {
          codeForm.fieldInfo.code.instance?.setErrorMap({
            onSubmit: "Code could not be resent",
          });
        }
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-center text-lg font-medium">
          {step === "email" ? "Sign in" : "Verify your account"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            step === "email"
              ? emailForm.handleSubmit(e)
              : codeForm.handleSubmit(e);
          }}
        >
          {step === "email" ? (
            <div className="flex flex-col gap-4">
              <emailForm.AppField
                name="email"
                children={(field) => (
                  <field.TextField
                    label="Email"
                    type="email"
                    icon="EnvelopeClosedIcon"
                    disabled={
                      emailForm.state.isSubmitting || requestSignIn.isPending
                    }
                  />
                )}
              />
              <Button
                type="submit"
                size="lg"
                disabled={
                  emailForm.state.isSubmitting || requestSignIn.isPending
                }
                loading={
                  emailForm.state.isSubmitting || requestSignIn.isPending
                }
              >
                Request Code
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <codeForm.AppField
                name="code"
                children={(field) => (
                  <field.OTPField
                    ref={otpFieldRef}
                    maxLength={6}
                    disabled={
                      codeForm.state.isSubmitting ||
                      redirecting ||
                      signIn.isPending ||
                      requestSignIn.isPending
                    }
                    variant="lg"
                    onFocus={() => {
                      if (otpFieldRef.current) {
                        otpFieldRef.current.value = "";
                      }
                    }}
                    onComplete={codeForm.handleSubmit}
                  />
                )}
              />
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  codeForm.state.isSubmitting ||
                  redirecting ||
                  signIn.isPending ||
                  requestSignIn.isPending
                }
                loading={
                  codeForm.state.isSubmitting || redirecting || signIn.isPending
                }
              >
                Confirm Code
              </Button>
              <Button
                type="button"
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => {
                  emailForm.handleSubmit();
                }}
                disabled={
                  emailForm.state.isSubmitting ||
                  codeForm.state.isSubmitting ||
                  signIn.isPending ||
                  requestSignIn.isPending ||
                  redirecting
                }
                loading={
                  emailForm.state.isSubmitting || requestSignIn.isPending
                }
              >
                Resend Code
              </Button>
            </div>
          )}
        </form>
      </div>
      {step === "email" ? (
        <>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-full bg-muted" />
            <span className="mx-4 text-sm font-medium uppercase text-muted-foreground">
              Or
            </span>
            <div className="h-[1px] w-full bg-muted" />
          </div>
          <div className="flex flex-col gap-2">
            <GoogleSignInButton googleOAuthUrl={googleOAuthUrl} />
          </div>
        </>
      ) : null}
    </div>
  );
}

function GoogleSignInButton({ googleOAuthUrl }: { googleOAuthUrl: string }) {
  return (
    <div>
      <Button type="button" className="w-full" variant="outline" asChild>
        <a href={googleOAuthUrl}>
          <Icon name="GoogleLogoIcon" className="mr-2 h-5 w-5" /> Sign in with
          Google
        </a>
      </Button>
    </div>
  );
}

const ssoFormSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
});

function SingleSignOnForm() {
  const getSSOUrl = useGetSSOUrl();
  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: ssoFormSchema,
    },
    onSubmit: async (values) => {
      const ssoUrl = await getSSOUrl.mutateAsync({
        email: values.value.email,
      });

      // Create a hidden a tag and set the href to the ssoUrl
      const a = document.createElement("a");
      a.href = ssoUrl;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  });

  return (
    <div>
      <h2 className="text-center text-lg font-medium">Single Sign On</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="flex flex-col gap-4"
      >
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField
              label="Email"
              type="email"
              icon="EnvelopeClosedIcon"
              disabled={getSSOUrl.isPending}
            />
          )}
        />
        <Button type="submit" className="w-full" loading={getSSOUrl.isPending}>
          Single Sign On
        </Button>
      </form>
    </div>
  );
}
