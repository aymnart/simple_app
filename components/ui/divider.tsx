import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface DividerProps {
  className?: string;
  vertical?: boolean;
  fill?:
    | "foreground"
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "success"
    | "destructive"
    | "border"
    | "info"; // Extend this list as needed
  children?: ReactNode;
  variant?: "default" | "gradient" | "dashed"; // Add new variants here
}

const fillMapping: Record<
  string,
  { default: string; gradient: string; dashed: string }
> = {
  foreground: {
    default: "bg-foreground",
    gradient: "to-foreground",
    dashed: "border-foreground",
  },
  border: {
    default: "bg-border",
    gradient: "to-border",
    dashed: "border-border",
  },
  primary: {
    default: "bg-primary",
    gradient: "to-primary",
    dashed: "border-primary",
  },
  secondary: {
    default: "bg-secondary",
    gradient: "to-secondary",
    dashed: "border-secondary",
  },
  accent: {
    default: "bg-accent",
    gradient: "to-accent",
    dashed: "border-accent",
  },
  warning: {
    default: "bg-warning",
    gradient: "to-warning",
    dashed: "border-warning",
  },
  success: {
    default: "bg-success",
    gradient: "to-success",
    dashed: "border-success",
  },
  destructive: {
    default: "bg-destructive",
    gradient: "to-destructive",
    dashed: "border-destructive ",
  },
  info: {
    default: "bg-info",
    gradient: "to-info",
    dashed: "border-info",
  },
  // You can add more color mappings here
};

/**
 * Divider component that renders a horizontal or vertical line with optional gradient and children.
 *
 * @param {string} className - Additional classes to apply to the divider.
 * @param {boolean} vertical - If true, the divider will be rotated to be vertical.
 * @param {string} fill - Determines the color fill of the divider. Defaults to "foreground".
 * @param {React.ReactNode} children - Optional children to render in the center of the divider.
 * @param {string} variant - Determines the style variant of the divider. Can be "default", "gradient", or "dashed". Defaults to "default".
 *
 * @returns {JSX.Element} The rendered divider component.
 */
const Divider: FC<DividerProps> = ({
  className,
  vertical,
  fill = "foreground",
  children,
  variant = "default",
}) => {
  // Retrieve the appropriate classes based on the fill prop
  const fillClass = fillMapping[fill] || fillMapping.foreground;

  return (
    <div
      className={cn(
        `relative flex items-center justify-center h-10 w-full ${
          vertical && "rotate-90"
        }`,
        className
      )}
    >
      <div className="absolute inset-0 flex items-center">
        {/* *******************gradient******************* */}
        {variant === "gradient" && (
          <>
            <span
              className={cn(
                "w-[90%] mx-auto h-[3px] bg-gradient-to-r from-transparent",
                fillClass.gradient
              )}
            />

            {children && (
              <div
                className={cn(
                  "gap-1 flex items-center justify-center p-1.5 rounded-full",
                  vertical && "-rotate-90"
                )}
              >
                {children}
              </div>
            )}
            <span
              className={cn(
                "w-[90%] mx-auto h-[3px] bg-gradient-to-l from-transparent ",
                fillClass.gradient
              )}
            />
          </>
        )}

        {/* *******************dashed******************* */}
        {variant === "dashed" && (
          <>
            <span
              className={cn(
                "w-[90%] mx-auto h-[3px] border-2 border-dashed",
                fillClass.dashed
              )}
            />
            {children && (
              <div
                className={cn(
                  "gap-1 flex items-center justify-center p-1.5 rounded-full",
                  vertical && "-rotate-90"
                )}
              >
                {children}
              </div>
            )}
            <span
              className={cn(
                "w-[90%] mx-auto h-[3px] border-2 border-dashed",
                fillClass.dashed
              )}
            />
          </>
        )}

        {/* *******************default******************* */}
        {variant === "default" && (
          <>
            <span
              className={cn(
                "w-[90%] mx-auto h-[3px] rounded-full",
                fillClass.default
              )}
            />
            {children && (
              <div
                className={cn(
                  "gap-1 flex items-center justify-center p-1.5 rounded-full",
                  vertical && "-rotate-90"
                )}
              >
                {children}
              </div>
            )}
            <span
              className={cn(
                "w-[90%] mx-auto h-[3px] rounded-full",
                fillClass.default
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Divider;
