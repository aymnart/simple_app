import React from "react";
import {} from "@/components/ui/card";
import { CardWrapper } from "./card-wrapper";
import { BiError } from "react-icons/bi";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops, something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      className="flex items-center justify-center flex-col"
    >
      <BiError className="text-destructive" size={32} />
    </CardWrapper>
  );
}
