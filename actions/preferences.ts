"use server";
import { db } from "@/lib/db";
import { appearanceFormSchema } from "@/schemas";
import { auth } from "@/auth";
import { z } from "zod";

export async function updateAppearancePreferences(
  data: z.infer<typeof appearanceFormSchema>
) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const validatedFields = appearanceFormSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid input!");
  }
  const user = session.user;
  if (!user || !user.id) {
    return { error: "User not found!" };
  }

  await db.userPreference.upsert({
    where: { userId: user.id },
    update: validatedFields.data,
    create: {
      userId: user.id,
      theme: validatedFields.data.theme || "",
      font: validatedFields.data.font || "",
    },
  });
  return { success: "User preferences updates successfully!" };
}
