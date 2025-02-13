"use client";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import useDocumentTitle from "@/hooks/use-document-title";
import { Key } from "lucide-react";
import React from "react";

export default function NewPasswordPage() {
  useDocumentTitle("New password");

  return (
    <div className="flex flex-col justify-center items-center">
      <Key size={36} />
      <NewPasswordForm />
    </div>
  );
}
