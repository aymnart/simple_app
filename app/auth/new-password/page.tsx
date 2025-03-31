"use client";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Key } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Securely reset your password to regain access to your account.",
};

export default function NewPasswordPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Key size={36} />
      <NewPasswordForm />
    </div>
  );
}
