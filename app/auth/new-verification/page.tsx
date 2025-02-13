"use client";
import NewVerificationForm from "@/components/auth/new-verification-form";
import useDocumentTitle from "@/hooks/use-document-title";
import { MailCheck } from "lucide-react";
import React from "react";

export default function NewVerificationPage() {
  useDocumentTitle("Verify your email");

  return (
    <div className="flex flex-col justify-center items-center">
      <MailCheck size={36} />
      <NewVerificationForm />
    </div>
  );
}
