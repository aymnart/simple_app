import { CheckCircle2 } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormSuccessProps {
  message?: string;
}
export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <Alert variant={"success"}>
      <AlertDescription className="flex items-center">
        <CheckCircle2 size={24} />
        <span className="ml-4">{message}</span>
      </AlertDescription>
    </Alert>
  );
}
