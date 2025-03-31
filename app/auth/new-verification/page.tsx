"use client";
import NewVerificationForm from "@/components/auth/new-verification-form";
import { MailCheck } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "New Verification",
  description: "Verify your account to complete the authentication process.",
};

export default function NewVerificationPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MailCheck size={36} />
      <NewVerificationForm />
    </div>
  );
}
