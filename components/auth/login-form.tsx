"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { authErrorMessages } from "@/data/error-messages";
import OTP from "../otp-input";

export function LoginForm() {
  const searchParams = useSearchParams();
  const authError = searchParams.get("error") as
    | keyof typeof authErrorMessages
    | null;

  const urlError = authError
    ? authErrorMessages[authError] || authErrorMessages.Default
    : "";
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.resetField("password");
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      headerDescription="Login with your Github or Google account"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
      className="bg-transparent"
      showSocial
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-10 p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6">
            {/* ---------------EMAIL------------------ */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel htmlFor="code">Enter your code:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <OTP {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="email"
                            {...field}
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            aria-label="Email input"
                            required
                            disabled={isPending}
                            error={form.formState.errors.email?.message}
                            isValid={
                              !form.formState.errors.email && !!field.value
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* ---------------PASSWORD------------------ */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">
                          Password <span className="text-destructive">*</span>
                        </FormLabel>
                        <Link
                          href="/auth/reset"
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            {...field}
                            placeholder="*******"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            aria-label="Password input"
                            required
                            disabled={isPending}
                            minLength={6}
                            error={form.formState.errors.password?.message}
                            isValid={
                              !form.formState.errors.password && !!field.value
                            }
                          />
                          <Button
                            type="button"
                            variant="link"
                            size="icon"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOffIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            ) : (
                              <EyeIcon className="h-4 w-4" aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {/* ------------ */}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            className="w-full capitalize"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex gap-2 items-center justify-center transition-all">
                <Loader className="animate-spin" />
              </span>
            ) : showTwoFactor ? (
              "Confirm"
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
