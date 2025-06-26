import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LoadingDots } from "./loading-dots";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "destructive-outline":
          "border bg-background  border-destructive text-destructive bg-transparent shadow-xs hover:bg-accent dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer font-normal",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        xs: "h-7 rounded-sm gap-1 px-2 has-[>svg]:px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(
          "relative",
          buttonVariants({ variant, size, className }),
          loading
            ? "text-transparent transition-none hover:text-transparent"
            : ""
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <button
      data-slot="button"
      className={cn(
        "relative",
        buttonVariants({ variant, size, className }),
        loading ? "text-transparent transition-none hover:text-transparent" : ""
      )}
      {...props}
    >
      <>
        {children}
        {loading ? (
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center">
            <LoadingDots
              className={cn("h-full w-full")}
              size="size-1"
              colour={
                variant === "default" || !variant
                  ? "bg-primary-foreground"
                  : variant === "secondary"
                    ? "bg-secondary-foreground"
                    : variant === "outline"
                      ? "bg-muted-foreground"
                      : variant === "destructive-outline"
                        ? "bg-destructive"
                        : variant === "destructive"
                          ? "bg-destructive-foreground"
                          : variant === "link"
                            ? "bg-primary"
                            : "bg-muted-foreground"
              }
            />
          </div>
        ) : null}
      </>
    </button>
  );
}

export { Button, buttonVariants };
