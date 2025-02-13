"use client";

import { LoginForm } from "@/components/auth/login-form";
import useDocumentTitle from "@/hooks/use-document-title";
import React from "react";

export default function LoginPage() {
  useDocumentTitle("Login");
  return (
    <div className="container flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
