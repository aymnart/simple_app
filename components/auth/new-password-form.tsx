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
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "", // Add confirmPassword to default values
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    if (values.password !== values.confirmPassword) {
      // Add password match validation
      setError("Passwords do not match");
      return;
    }
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          className={"flex flex-col gap-10"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6">
            {/* ---------------Password------------------ */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        {...field}
                        placeholder="*******"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
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
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        {...field}
                        placeholder="*******"
                        type={"password"}
                        autoComplete="new-password"
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
            {/* --------------------- */}
          </div>
          <FormError message={error} />
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
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

// <CardWrapper
//   headerLabel="Welcome back!"
//   backButtonLabel="Don't have an account?"
//   backButtonHref="/auth/register"
//   showSocial
// >
//   <Form {...form}>
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//       <div className="space-y-4">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <Input
//                     {...field}
//                     placeholder="name@example.com"
//                     type="email"
//                     autoComplete="email"
//                     aria-label="Email input"
//                     required
//                     disabled={isPending}
//                     error={form.formState.errors.email?.message}
//                     isValid={!form.formState.errors.email && !!field.value}
//                   />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* ------------------ */}
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <Input
//                     {...field}
//                     placeholder="******"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="password"
//                     aria-label="Password input"
//                     required
//                     disabled={isPending}
//                     minLength={6}
//                     error={form.formState.errors.password?.message}
//                     isValid={
//                       !form.formState.errors.password && !!field.value
//                     }
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-2 top-1/2 -translate-y-1/2"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
//                     ) : (
//                       <EyeIcon className="h-4 w-4" aria-hidden="true" />
//                     )}
//                     <span className="sr-only">
//                       {showPassword ? "Hide password" : "Show password"}
//                     </span>
//                   </Button>
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//       <FormError message={error} />
//       <FormSuccess message={success} />
//       <Button
//         className="w-full capitalize"
//         type="submit"
//         disabled={isPending}
//       >
//         {isPending ? (
//           <span className="flex gap-2 items-center justify-center transition-all">
//             <Loader className="animate-spin" /> Submitting...
//           </span>
//         ) : (
//           "Login"
//         )}
//       </Button>
//     </form>
//   </Form>
// </CardWrapper>
