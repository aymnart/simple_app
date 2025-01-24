import React from "react";
interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="flex flex-col w-full gap-y-2 items-center justify-center">
      <h1 className={"text-3xl font-semibold"}>Auth</h1>
      <p className="text-muted-foreground text-sm"> {label} </p>
    </div>
  );
}
