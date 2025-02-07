import { Button } from "@/components/ui/button";
import React from "react";
import { LoginButton } from "@/components/auth/login-button";
import Divider from "@/components/ui/divider";
import { Quote } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="space-y-6 text-center">
        <h1 className={"text-6xl drop-shadow-md font-semibold text-foreground"}>
          Auth
        </h1>
        <p className="text-foreground capitalize text-lg">
          simple authentication service
        </p>

        <LoginButton>
          <Button className="capitalize" variant={"secondary"} size={"lg"}>
            sign in
          </Button>
        </LoginButton>
        <Divider fill="destructive" variant="default">
          <Quote
            color="hsl(var(--destructive))"
            fill="hsl(var(--destructive))"
            size={18}
          />
        </Divider>
      </div>
    </main>
  );
}
