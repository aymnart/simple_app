// Utility function to calculate token expiry time
const calculateExpiry = (seconds: number): Date =>
  new Date(Date.now() + seconds * 1000);

/**
 * 2FA token time = 5 mins
 */ export const twoFactorTokenExpiry = calculateExpiry(300);

/**
 * Password reset time = 1 hour
 */ export const passwordResetTokenExpiry = calculateExpiry(3600);

/**
 * Email verification token time = 1 hour
 */ export const verificationTokenExpiry = calculateExpiry(3600);

/**
 * 2FA confirmation time = 24 hours
 */ export const twoFactorConfirmationExpiry = calculateExpiry(24 * 3600);
