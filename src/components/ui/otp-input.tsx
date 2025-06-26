"use client";

import * as React from "react";
import { OTPInput as InnerOTPInput, SlotProps } from "input-otp";

import { cn } from "@/lib/utils";
import { chunk } from "@/lib/chunk";
import { Icon } from "./icon";

export type OTPInputProps = Omit<
  React.ComponentProps<typeof InnerOTPInput>,
  "children"
> & {
  containerClassName?: string;
  className?: string;
  hasErrors?: boolean;
  chunkSize?: number;
  variant?: "default" | "lg";
};

function OTPInput({
  className,
  containerClassName,
  hasErrors,
  chunkSize = 3,
  variant,
  ...props
}: OTPInputProps) {
  return (
    <InnerOTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      render={({ slots }) => {
        const chunkedSlots = chunk(slots, {
          chunkSize,
        });
        return (
          <div className="flex w-full items-center gap-2 justify-between">
            {chunkedSlots.map((slotChunk, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex items-center">
                    {slotChunk.map((slot, slotIndex) => (
                      <React.Fragment key={slotIndex}>
                        <OTPInputSlot
                          {...slot}
                          hasErrors={hasErrors}
                          variant={variant}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  {index !== chunkedSlots.length - 1 ? (
                    <OTPInputSeparator hasErrors={hasErrors} />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        );
      }}
      {...props}
    />
  );
}

function OTPInputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

interface OTPInputSlotProps extends SlotProps {
  className?: string;
  hasErrors?: boolean;
  variant?: "default" | "lg";
}
function OTPInputSlot({
  char,
  hasFakeCaret,
  isActive,
  placeholderChar,
  className,
  hasErrors,
  variant,
  ...props
}: OTPInputSlotProps) {
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive ? "true" : undefined}
      data-error={hasErrors ? "true" : undefined}
      className={cn(
        "data-error:border-destructive data-active:data-error:border-destructive data-active:border-ring data-active:data-error:ring-destructive/20 dark:data-active:data-error:ring-destructive/50 data-active:ring-ring/50 data-active:aria-invalid:ring-destructive/20 dark:data-active:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-active:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex size-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-active:z-10 data-active:ring-[3px]",
        variant === "lg" ? "size-14" : "size-9",
        className
      )}
      {...props}
    >
      {char ?? placeholderChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

interface OTPInputSeparatorProps extends React.ComponentProps<"div"> {
  hasErrors?: boolean;
}
function OTPInputSeparator({ hasErrors, ...props }: OTPInputSeparatorProps) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Icon
        name="MinusIcon"
        data-error={hasErrors ? "true" : undefined}
        className={cn("size-4 data-error:text-destructive")}
      />
    </div>
  );
}

export { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator };
