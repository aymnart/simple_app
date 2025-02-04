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
      <AlertDescription className="flex items-center">
        {" "}
        <BiError className="h-5 w-5 mr-2" />
        {message}{" "}
      </AlertDescription>
    </Alert>
  );
}
