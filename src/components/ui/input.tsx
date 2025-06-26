import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon, IconName } from "@/components/ui/icon";

interface InputProps extends React.ComponentProps<"input"> {
  hasErrors?: boolean;
  icon?: IconName;
}
function Input({ className, type, hasErrors, icon, ...props }: InputProps) {
  return (
    <div className={cn("group relative w-full", className)}>
      {icon ? (
        <Icon
          name={icon}
          data-error={hasErrors ? "true" : undefined}
          className="data-error:text-destructive absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary data-[error='true']:text-destructive/60 data-[error='true']:group-focus-within:text-destructive"
        />
      ) : null}
      <input
        type={type}
        data-slot="input"
        data-error={hasErrors ? "true" : undefined}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-error:border-destructive",
          className,
          icon ? "pl-10" : ""
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
