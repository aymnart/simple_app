import React from "react";
import { BiError } from "react-icons/bi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
}
export default function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;
  return (
    <Alert className={cn(className)} variant={"destructive"}>
      <AlertDescription className="flex items-start">
        <BiError size={24} />
        <span className="ml-4">{message}</span>
      </AlertDescription>
    </Alert>
  );
}
