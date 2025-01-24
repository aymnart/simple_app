import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import React from "react";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full  ">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl drop-shadow-md font-semibold text-foreground",
            font.className
          )}
        >
          Auth
        </h1>
        <p className="text-foreground capitalize text-lg">
          simple authentication service
        </p>
        <div className="">
          <LoginButton>
            <Button className="capitalize" variant={"secondary"} size={"lg"}>
              sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
