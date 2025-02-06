"use client ";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
  buttonVariant?:
    | "link"
    | "default"
    | "success"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export default function BackButton({
  href,
  label,
  buttonVariant = "link",
}: BackButtonProps) {
  return (
    <Button
      variant={buttonVariant}
      className="w-full font-normal"
      size={"sm"}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
