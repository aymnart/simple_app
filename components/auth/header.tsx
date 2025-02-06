import React from "react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
interface HeaderProps {
  label: string;
  description?: string;
}

export default function Header({ label, description }: HeaderProps) {
  return (
    <CardHeader className="text-center mt-4">
      <CardTitle className="text-2xl font-bold  text-balance text-foreground">
        {label}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  );
}
// bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-balance text-sm text-transparent "
