import { CheckCircle2 } from "lucide-react";
import React from "react";

interface FormSuccessProps {
  message?: string;
}
export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="bg-success/15 p-3 px-5 rounded-md flex items-center gap-x-2 text-sm text-success">
      <CheckCircle2 className="h-5 w-5 mr-2" />
      <p> {message} </p>
    </div>
  );
}
