import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Minimum 6 characters required!" }),
  confirmPassword: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Minimum 6 characters required!" }),
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
});
export const RegisterSchema = z.object({
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
  name: z.string().nonempty("Name is required!").min(2),
});
