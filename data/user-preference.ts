import { db } from "@/lib/db";

export const getUserPreferenceById = async (id: string) => {
  try {
    const userPreference = await db.userPreference.findFirst({
      where: {
        user: {
          id: id,
        },
      },
    });
    return userPreference;
  } catch {
    return null;
  }
};
