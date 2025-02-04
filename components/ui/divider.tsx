import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface DividerProps {
  className?: string;
  children?: ReactNode;
  style?: string;
}

/**
 * A horizontal rule component that displays a styled line with optional children content.
 *
 * @component
 * @param {HrProps} props - The properties for the Hr component.
 * @param {string} props.className - Additional class names to apply to the component.
 * @param {React.ReactNode} props.children - The content to display in the center of the horizontal rule.
 * @param {"default" | "gradient"} [props.style="default"] - The style of the horizontal rule. Can be "default" or "gradient".
 * @returns {JSX.Element} The rendered Hr component.
 */
const Divider: FC<DividerProps> = ({
  className,
  children,
  style = "default",
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center h-10 w-full",
        className
      )}
    >
      {/* styles */}
      <div className="absolute inset-0 flex items-center">
        {style === "gradient" && (
          <span className="w-[90%] mx-auto h-[3px] bg-gradient-to-r from-transparent via-foreground to-transparent" />
        )}
        {style === "default" && (
          <span className="w-[90%] mx-auto h-[3px] bg-foreground rounded-full" />
        )}
      </div>

      {/* types */}
      {children && (
        <div className="absolute flex items-center justify-center bg-background w-10 h-10 rounded-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default Divider;
