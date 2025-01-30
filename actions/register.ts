"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  const saltRounds = 10;
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  //get email, password and name from validated fields
  const { email, password, name } = validatedFields.data;

  //generate salt and hash password
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  //check if email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  //create a user if email doesnt exist
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  //TODO: send verification token email

  return {
    success:
      "🎉 Congratulations! Your account has been created successfully. Welcome aboard! 🎉",
  };
};
