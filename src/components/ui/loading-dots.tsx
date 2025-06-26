import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  size?:
    | "size-0.5"
    | "size-1"
    | "size-1.5"
    | "size-2"
    | "size-2.5"
    | "size-3"
    | "size-3.5"
    | "size-4";
  className?: string;
  colour?: string;
}

export function LoadingDots({
  size = "size-2",
  className,
  colour = "bg-muted-foreground",
}: LoadingDotsProps) {
  return (
    <div className={cn("rounded-lg p-2", className)}>
      <div className="flex space-x-1">
        <div
          className={cn(
            "animate-[bounce_0.8s_infinite] rounded-full [animation-delay:-0.3s]",
            colour,
            size
          )}
        ></div>
        <div
          className={cn(
            "animate-[bounce_0.8s_infinite] rounded-full [animation-delay:-0.15s]",
            colour,
            size
          )}
        ></div>
        <div
          className={cn(
            "animate-[bounce_0.8s_infinite] rounded-full",
            colour,
            size
          )}
        ></div>
      </div>
    </div>
  );
}
