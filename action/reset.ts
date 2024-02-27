"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/Data/user";

import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const ValidateField = ResetSchema.safeParse(values);

  if (!ValidateField.success) {
    return { error: "Invalid Fields!" };
  }

  const { email } = ValidateField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email Does not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
