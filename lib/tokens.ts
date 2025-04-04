import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

/**
 * Generates a two-factor authentication token for the given email.
 * The token is a 6-digit random number and is valid for 5 minutes.
 * If a token already exists for the email, it will be deleted before creating a new one.
 *
 * @param email - The email address for which the two-factor token is generated.
 * @returns A promise that resolves to the newly created two-factor token object.
 */
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // Set the confirmation token expiry time to 5 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email, { id: true });
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  /**
   * Calculates the expiration time for a token.
   * The expiration is set to 1 hour (3600 seconds) from the current time.
   */ const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  /**
   * Calculates the expiration time for a token.
   * The expiration is set to 1 hour (3600 seconds) from the current time.
   */
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email, { id: true });
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const verificationToken = db.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
  return verificationToken;
};
