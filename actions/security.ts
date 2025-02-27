"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { securityFormSchema } from "@/schemas";
import z from "zod";

export const updateSecuritySettings = async (
  data: z.infer<typeof securityFormSchema>
) => {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const validatedFields = securityFormSchema.safeParse(data);
  if (!validatedFields) {
    throw new Error("Invalid");
  }

  const user = session.user;
  if (!user || !user.id) {
    return { error: "User not found!" };
  }

  await db.user.update({
    where: { id: user.id },
    data: { isTwoFactorEnabled: validatedFields.data?.two_factor },
  });

  return { success: "Security settings updated successfully!" };
};
