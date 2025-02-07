import React from "react";
import {} from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Authentication Error"
      headerDescription="We encountered an issue while trying to authenticate you. This could be due to an expired session or invalid
          credentials."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonVariant={"default"}
      className="flex items-center justify-center flex-col"
    />
  );
}
