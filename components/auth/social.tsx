"use client";
import React, { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LOGIN_DEFAULT_REDIRECT } from "@/routes";
import { Loader } from "lucide-react";
import Image from "next/image";

export function Social() {
  const [isPending, startTransition] = useTransition();

  const onClick = (provider: "github" | "google") => {
    startTransition(() => {
      signIn(provider, {
        callbackUrl: LOGIN_DEFAULT_REDIRECT,
      });
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => {
            onClick("github");
          }}
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/github.svg"
                width={16}
                height={16}
                alt={"github logo"}
              />
              Login with Github
            </div>
          )}
        </Button>
        <Button
          onClick={() => {
            onClick("google");
          }}
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/google.svg"
                width={16}
                height={16}
                alt={"google logo"}
              />
              Login with Google
            </div>
          )}
        </Button>
      </div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
}
