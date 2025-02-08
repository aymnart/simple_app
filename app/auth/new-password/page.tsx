import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Key } from "lucide-react";
import React from "react";

export default function NewPasswordPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Key size={36} />
      <NewPasswordForm />
    </div>
  );
}
