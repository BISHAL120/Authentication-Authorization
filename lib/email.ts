import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Authentication Code",
    html: `<h4>Your Code 👇</h4>
      <h1>${token}</h1>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify Your Email",
    html: `<h1>Please verify your email</h1>
      <a href="${confirmationLink}">Click here to verify your email</a>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `<h1>Please reset your password</h1>
      <a href="${confirmationLink}">Click here to reset your password</a>`,
  });
};
