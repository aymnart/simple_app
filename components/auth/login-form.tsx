"use client";
import React from "react";
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
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { log } from "console";

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="name@exmaple.com"
                        type="email"
                        autoComplete="email"
                        aria-label="Email input"
                        required
                        className={
                          form.formState.errors.email
                            ? "border-destructive border-2 focus-visible:ring-destructive"
                            : form.formState.isValid
                            ? "border-success border-2 focus-visible:ring-success "
                            : undefined
                        }
                      />
                      {form.formState.errors.email && (
                        <AlertCircle className="absolute right-2 top-1.5 text-destructive" />
                      )}
                      {form.formState.isValid && (
                        <Check className="absolute right-2 top-1.5 text-success" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ------------------ */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        autoComplete="password"
                        aria-label="Password input"
                        required
                        minLength={6}
                        className={
                          form.formState.errors.password
                            ? "border-destructive border-2 focus-visible:ring-destructive"
                            : form.formState.isValid
                            ? "border-success border-2 focus-visible:ring-success "
                            : undefined
                        }
                      />
                      {form.formState.errors.password && (
                        <AlertCircle className="absolute right-2 top-1.5 text-destructive" />
                      )}
                      {form.formState.isValid && (
                        <Check className="absolute right-2 top-1.5 text-success" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full capitalize">
            login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
