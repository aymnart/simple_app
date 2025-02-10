import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your 2FA Code</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f7f9;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
            font-size: 28px;
        }
        p {
            margin-bottom: 15px;
        }
        .code {
            font-size: 36px;
            font-weight: bold;
            color: #e74c3c;
            letter-spacing: 5px;
            margin: 30px 0;
            text-align: center;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #7f8c8d;
            text-align: center;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://via.placeholder.com/150x50.png?text=Your+Logo" alt="Company Logo">
        </div>
        <h1>Your 2FA Code</h1>
        <p>Hello,</p>
        <p>You've requested a two-factor authentication code to access your account. Please use the following code:</p>
        <p class="code">${token}</p>
        <div class="divider"></div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email and consider changing your password.</p>
        <div class="footer">
            <p>If you're having trouble, please contact our support team.</p>
            <p>&copy; Octoware - All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f7f9;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
            font-size: 28px;
        }
        p {
            margin-bottom: 15px;
        }
        .btn {
            display: inline-block;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #7f8c8d;
            text-align: center;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://via.placeholder.com/150x50.png?text=Your+Logo" alt="Company Logo">
        </div>
        <h1>Reset Your Password</h1>
        <p>Hello,</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <a href="${resetLink}" class="btn">Reset Password</a>
        <div class="divider"></div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${resetLink}</p>
        <p>This link will expire in 24 hours.</p>
        <div class="footer">
            <p>If you're having trouble, please contact our support team.</p>
            <p>&copy; Octoware - All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm email",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f7f9;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
            font-size: 28px;
        }
        p {
            margin-bottom: 15px;
        }
        .btn {
            display: inline-block;
            background-color: #2ecc71;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #7f8c8d;
            text-align: center;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://via.placeholder.com/150x50.png?text=Your+Logo" alt="Company Logo">
        </div>
        <h1>Verify Your Email</h1>
        <p>Hello,</p>
        <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
        <a href="${confirmLink}" class="btn">Verify Email</a>
        <div class="divider"></div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${confirmLink}</p>
        <p>This link will expire in 24 hours.</p>
        <div class="footer">
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p>If you're having trouble, please contact our support team.</p>
            <p>&copy; Octoware - All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
  });
};
