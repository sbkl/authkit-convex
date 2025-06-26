"use client";

import { ConvexError } from "convex/values";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/form";
import { OTPInput } from "@/components/ui/otp-input";
import { useRouter } from "next/navigation";

import { requestSignIn, signIn } from "@/lib/workos";
import { useAuth } from "@workos-inc/authkit-nextjs/components";

const emailFormSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase(),
});

const codeFormSchema = emailFormSchema.extend({
  code: z.string().length(6, "Invalid code"),
});

export function AuthForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<"email" | "code">("email");
  const [redirecting, setRedirecting] = React.useState(false);
  const { refreshAuth } = useAuth();
  const otpFieldRef = React.useRef<React.ComponentRef<typeof OTPInput>>(null);

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
        await signIn(values.value.email.toLowerCase(), values.value.code);
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
        await requestSignIn(values.value.email.toLowerCase());
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
    <div className="h-full w-full max-w-sm space-y-6 mx-auto pt-48">
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
                  disabled={emailForm.state.isSubmitting}
                />
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={emailForm.state.isSubmitting}
              loading={emailForm.state.isSubmitting}
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
                  // label="Enter your code"
                  maxLength={6}
                  disabled={codeForm.state.isSubmitting || redirecting}
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
              disabled={codeForm.state.isSubmitting || redirecting}
              loading={codeForm.state.isSubmitting || redirecting}
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
                redirecting
              }
              loading={emailForm.state.isSubmitting}
            >
              Resend Code
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
