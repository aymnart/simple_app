import ErrorCard from "@/components/auth/error-card";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication Error",
  description:
    "An error occurred during the authentication process. Please try again.",
};

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col border rounded-lg p-4 pt-6 shadow-lg">
      <AlertCircle className="mx-auto h-14 w-14 text-destructive" />
      <ErrorCard />
    </div>
  );
}
