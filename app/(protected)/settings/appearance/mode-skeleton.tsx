import React from "react";

interface ModeSkeletonProps {
  mode: "light" | "dark";
}

export default function ModeSkeleton({ mode }: ModeSkeletonProps) {
  return (
    <>
      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
        <div
          className={`space-y-2 rounded-sm p-2 ${
            mode === "dark" ? "bg-slate-950" : "bg-white"
          }`}
        >
          <div
            className={`space-y-2 rounded-md p-2 shadow-sm ${
              mode === "dark" ? "bg-slate-800" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-2 w-[80px] rounded-lg ${
                mode === "dark" ? "bg-slate-400" : "bg-gray-400"
              }`}
            />
            <div
              className={`h-2 w-[100px] rounded-lg ${
                mode === "dark" ? "bg-slate-400" : "bg-gray-400"
              }`}
            />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md p-2 shadow-sm ${
              mode === "dark" ? "bg-slate-800" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full ${
                mode === "dark" ? "bg-slate-400" : "bg-gray-400"
              }`}
            />
            <div
              className={`h-2 w-[100px] rounded-lg ${
                mode === "dark" ? "bg-slate-400" : "bg-gray-400"
              }`}
            />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md p-2 shadow-sm ${
              mode === "dark" ? "bg-slate-800" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full ${
                mode === "dark" ? "bg-slate-400" : "bg-gray-400"
              }`}
            />
            <div
              className={`h-2 w-[100px] rounded-lg ${
                mode === "dark" ? "bg-slate-400" : "bg-gray-400"
              }`}
            />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 text-center font-normal">
        {mode === "dark" ? "Dark" : "Light"}
      </span>
    </>
  );
}
