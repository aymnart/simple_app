"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  className?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  backButtonHref,
  backButtonLabel,
  showSocial,
  className,
}: CardWrapperProps) {
  return (
    <Card className={cn("w-96 shadow-lg", className)}>
      <Header description={headerDescription} label={headerLabel} />

      <CardContent>{showSocial && <Social />}</CardContent>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
