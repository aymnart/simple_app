import { ResetForm } from "@/components/auth/reset-form";
import { ShieldCheck } from "lucide-react";
import React from "react";

export default function ResetPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ShieldCheck size={36} />
      <ResetForm />
    </div>
  );
}
