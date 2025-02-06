import NewVerificationForm from "@/components/auth/new-verification-form";
import { MailCheck } from "lucide-react";
import React from "react";

export default function NewVerificationPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MailCheck size={36} />
      <NewVerificationForm />
    </div>
  );
}
