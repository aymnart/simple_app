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
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { register } from "@/actions/register";
import { useSearchParams } from "next/navigation";
import { authErrorMessages } from "@/data/error-messages";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const authError = searchParams.get("error") as
    | keyof typeof authErrorMessages
    | null;

  const urlError = authError
    ? authErrorMessages[authError] || authErrorMessages.Default
    : "";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    if (values.password !== values.confirmPassword) {
      // Add password match validation
      setError("Passwords do not match");
      return;
    }
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Sign in"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* ---------------NAME--------------- */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="name"
                        {...field}
                        placeholder="name"
                        type="text"
                        autoComplete="name"
                        aria-label="name input"
                        disabled={isPending}
                        error={form.formState.errors.name?.message}
                        isValid={!form.formState.errors.name && !!field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ----------------EMAIL----------------- */}
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
                        disabled={isPending}
                        error={form.formState.errors.email?.message}
                        isValid={!form.formState.errors.email && !!field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ----------------PASSWORD----------------- */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        {...field}
                        placeholder="*******"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        aria-label="Password input"
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
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
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
            {/* ---------------Confirm Password------------------ */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        {...field}
                        placeholder="*******"
                        type={"password"}
                        aria-label="Confirm Password input"
                        disabled={isPending}
                        minLength={6}
                        error={form.formState.errors.confirmPassword?.message}
                        isValid={
                          !form.formState.errors.confirmPassword &&
                          !!field.value
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="w-full " type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex gap-2 items-center justify-center transition-all">
                <Loader className="animate-spin" />
              </span>
            ) : (
              "Create an account"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
