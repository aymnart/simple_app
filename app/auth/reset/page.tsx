"use client";

import { ResetForm } from "@/components/auth/reset-form";
import useDocumentTitle from "@/hooks/use-document-title";
import { ShieldCheck } from "lucide-react";
import React from "react";

export default function ResetPage() {
  useDocumentTitle("Forgot password?");
  return (
    <div className="flex flex-col justify-center items-center">
      <ShieldCheck size={36} />
      <ResetForm />
    </div>
  );
}
