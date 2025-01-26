import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for conditional class merging

export const Input = React.forwardRef(
  (
    {
      error,
      isValid,
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
      error?: string; // Error message or undefined
      isValid?: boolean; // Success state
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="relative">
        {/* Input Field */}
        <input
          ref={ref}
          {...props}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error
              ? "border-destructive focus-visible:ring-destructive shadow-[-2px_2px_0px_0px_hsl(var(--destructive))] "
              : isValid
              ? "border-success focus-visible:ring-success shadow-[-2px_2px_0px_0px_hsl(var(--success))]"
              : "border-border focus-visible:ring-ring"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "input-error" : undefined}
        />

        {/* Icon Feedback */}
        {error ? (
          <AlertCircle className="absolute right-2 top-1.5 text-destructive" />
        ) : isValid ? (
          <CheckCircle2 className="absolute right-2 top-1.5 text-success" />
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
