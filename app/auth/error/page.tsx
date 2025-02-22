"use client";
import ErrorCard from "@/components/auth/error-card";
import useDocumentTitle from "@/hooks/use-document-title";
import { AlertCircle } from "lucide-react";
import React from "react";

export default function AuthErrorPage() {
  useDocumentTitle("Something went wrong!");
  return (
    <div className="flex flex-col border rounded-lg p-4 pt-6 shadow-lg">
      <AlertCircle className="mx-auto h-14 w-14 text-destructive" />
      <ErrorCard />
    </div>
  );
}
