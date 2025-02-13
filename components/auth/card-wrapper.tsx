"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonVariant?:
    | "link"
    | "default"
    | "success"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  showSocial?: boolean;
  className?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  backButtonHref,
  backButtonLabel,
  backButtonVariant,
  showSocial,
  className,
}: CardWrapperProps) {
  return (
    <Card
      className={cn(
        "w-96 grid justify-center items-center border-none shadow-none",
        className
      )}
    >
      <Header description={headerDescription} label={headerLabel} />

      {showSocial && (
        <CardContent className="pb-0">
          <Social />
        </CardContent>
      )}
      {children && <CardContent>{children}</CardContent>}

      <CardFooter>
        <BackButton
          buttonVariant={backButtonVariant}
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
}
