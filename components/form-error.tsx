import React from "react";
import { BiError } from "react-icons/bi";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormErrorProps {
  message?: string;
}
export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <Alert variant={"destructive"}>
      <AlertDescription className="flex">
        <BiError size={36} />
        <span className="ml-4">{message}</span>
      </AlertDescription>
    </Alert>
  );
}
