import * as z from "zod";
import { fontsList } from "@/font.config";
export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
    confirmPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Minimum 6 characters required!" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
    confirmPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Minimum 6 characters required!" }),
    name: z
      .string()
      .nonempty("Name is required!")
      .min(2, { message: "Name must be at least 2 characters long!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const appearanceFormSchema = z.object({
  theme: z
    .enum(["light", "dark"], {
      required_error: "Please select a theme.",
    })
    .optional(),
  font: z
    .enum(fontsList as [string, ...string[]], {
      invalid_type_error: "Select a font",
      required_error: "Please select a font.",
    })
    .optional(),
});

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});

export const notificationsFormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});
export const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export const securityFormSchema = z.object({
  two_factor: z.boolean().default(false).optional(),
});
