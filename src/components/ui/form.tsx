import * as React from "react";
import {
  AnyFieldMeta,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";
import { ZodError } from "zod";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import { Textarea } from "./textarea";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

interface ErrorFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  meta: AnyFieldMeta;
}

export function ErrorsField({ meta, className, ...props }: ErrorFieldProps) {
  if (!meta.errors.length) return null;
  return (
    <div className={cn(className)} {...props}>
      {meta.errors.map((e: ZodError | string, index) => {
        return (
          <p key={index.toString()} className="mb-1 text-xs text-destructive">
            {typeof e === "string" ? e : e.message}
          </p>
        );
      })}
    </div>
  );
}

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  label?: string;
  containerClassName?: string;
}

export function TextField({
  label,
  containerClassName,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const hasErrors = field.state.meta.errors.length > 0;

  return (
    <div className={cn("w-full", containerClassName)}>
      {label ? (
        <Label
          htmlFor={field.name}
          className={cn("", hasErrors ? "text-destructive" : "")}
        >
          {label}
        </Label>
      ) : null}
      <Input
        {...props}
        className={cn(label ? "mt-1.5" : "", props.className)}
        name={field.name}
        hasErrors={hasErrors}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <ErrorsField className="mt-1.5 pl-3" meta={field.state.meta} />
    </div>
  );
}

interface TextareaFieldProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
}

export function TextareaField({ label, ...props }: TextareaFieldProps) {
  const field = useFieldContext<string>();
  const hasErrors = field.state.meta.errors.length > 0;

  return (
    <div className="w-full">
      {label ? (
        <Label
          htmlFor={field.name}
          className={cn("", hasErrors ? "text-destructive" : "")}
        >
          {label}
        </Label>
      ) : null}
      <Textarea
        {...props}
        className={cn(label ? "mt-1.5" : "", props.className)}
        name={field.name}
        hasErrors={hasErrors}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <ErrorsField className="mt-1.5 pl-3" meta={field.state.meta} />
    </div>
  );
}

type OTPFieldProps = React.ComponentProps<typeof OTPInput> & {
  label?: string;
};

export function OTPField({ label, ...props }: OTPFieldProps) {
  const field = useFieldContext<string>();
  const hasErrors = field.state.meta.errors.length > 0;
  return (
    <div className="flex w-full flex-col justify-center">
      {label ? (
        <Label
          htmlFor={field.name}
          className={cn("text-center", hasErrors ? "text-destructive" : "")}
        >
          {label}
        </Label>
      ) : null}
      <OTPInput
        {...props}
        containerClassName="mt-4 w-full"
        hasErrors={hasErrors}
        name={field.name}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
      />
      <ErrorsField className="mt-1.5 text-center" meta={field.state.meta} />
    </div>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    OTPField,
    TextField,
    TextareaField,
  },
  formComponents: {
    // SubscribeButton,
  },
  fieldContext,
  formContext,
});
