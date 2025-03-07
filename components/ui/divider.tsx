import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical" | "ver" | "hor" | "v" | "h";
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
    dashed: "border-foreground border-2 border-dashed",
  },
  border: {
    default: "bg-border",
    gradient: "to-border",
    dashed: "border-border border-2 border-dashed",
  },
  primary: {
    default: "bg-primary",
    gradient: "to-primary",
    dashed: "border-primary border-2 border-dashed",
  },
  secondary: {
    default: "bg-secondary",
    gradient: "to-secondary",
    dashed: "border-secondary border-2 border-dashed",
  },
  accent: {
    default: "bg-accent",
    gradient: "to-accent",
    dashed: "border-accent border-2 border-dashed",
  },
  warning: {
    default: "bg-warning",
    gradient: "to-warning",
    dashed: "border-warning border-2 border-dashed",
  },
  success: {
    default: "bg-success",
    gradient: "to-success",
    dashed: "border-success border-2 border-dashed",
  },
  destructive: {
    default: "bg-destructive",
    gradient: "to-destructive",
    dashed: "border-destructive border-2 border-dashed",
  },
  info: {
    default: "bg-info",
    gradient: "to-info",
    dashed: "border-info border-2 border-dashed",
  },
  // You can add more color mappings here
};

/**
 * Divider component that renders a horizontal or vertical line with optional gradient and children.
 *
 * @param {string} className - Additional classes to apply to the divider.
 * @param {enum} orientation - can be horizontal or vertical.
 * @param {string} fill - Determines the color fill of the divider. Defaults to "foreground".
 * @param {React.ReactNode} children - Optional children to render in the center of the divider.
 * @param {string} variant - Determines the style variant of the divider. Can be "default", "gradient", or "dashed". Defaults to "default".
 *
 * @returns {JSX.Element} The rendered divider component.
 */
const Divider: FC<DividerProps> = ({
  className,
  orientation = "horizontal",
  fill = "foreground",
  children,
  variant = "default",
}) => {
  // Retrieve the appropriate classes based on the fill prop
  const fillClass = fillMapping[fill] || fillMapping.foreground;

  return (
    <div
      className={cn(
        `m-2 flex items-center`,
        "vertical".includes(orientation)
          ? "w-10 h-full flex-col"
          : "h-10 w-full",
        className
      )}
    >
      <span
        className={cn(
          "from-transparent",
          fillClass[variant],
          "vertical".includes(orientation)
            ? "w-1 h-[90%] bg-gradient-to-b"
            : "w-[90%] h-1 bg-gradient-to-r"
        )}
      />
      {children && (
        <div
          className={cn(
            "gap-1 flex items-center justify-center p-1.5 rounded-full",
            "vertical".includes(orientation) && "flex-col"
          )}
        >
          {children}
        </div>
      )}
      <span
        className={cn(
          "from-transparent",
          fillClass[variant],
          "vertical".includes(orientation)
            ? "w-1 h-[90%] bg-gradient-to-t"
            : "w-[90%] h-1 bg-gradient-to-l"
        )}
      />
    </div>
  );
};

export default Divider;
