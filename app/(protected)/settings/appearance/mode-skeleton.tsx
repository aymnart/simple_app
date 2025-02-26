import { cn } from "@/lib/utils";
import React from "react";

interface ModeSkeletonProps {
  mode: string;
  className?: string;
}

const ModeSkeleton: React.FC<ModeSkeletonProps> = ({ mode, className }) => {
  return (
    <div className={cn(mode, className)}>
      <div className="items-center rounded-md border-border bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-2 rounded-sm p-2 bg-background">
          <div className="space-y-2 rounded-md p-2 shadow-sm bg-primary">
            <div className="h-2 w-[80px] rounded-lg bg-primary-foreground" />
            <div className="h-2 w-[100px] rounded-lg bg-primary-foreground" />
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 shadow-sm bg-secondary">
            <div className="h-4 w-4 rounded-full bg-secondary-foreground" />
            <div className="h-2 w-[100px] rounded-lg bg-secondary-foreground" />
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 shadow-sm bg-accent">
            <div className="h-4 w-4 rounded-full bg-accent-foreground" />
            <div className="h-2 w-[100px] rounded-lg bg-accent-foreground" />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 text-center capitalize font-normal">
        {mode}
      </span>
    </div>
  );
};

export default ModeSkeleton;
