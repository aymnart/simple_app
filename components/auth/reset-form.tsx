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
import { ResetSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Loader } from "lucide-react";
import { reset } from "@/actions/reset";

export function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      headerDescription="Type your email and we will send you a link to reset your password."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          className={"flex flex-col gap-10"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6">
            {/* ---------------EMAIL------------------ */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="name@example.com"
                        type="email"
                        autoComplete="email"
                        aria-label="Email input"
                        required
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
              "Send reset email"
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
