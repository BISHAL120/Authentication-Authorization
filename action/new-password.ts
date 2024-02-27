"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPAsswordResetTokenByToken } from "@/Data/password-reset-token";
import { getUserByEmail } from "@/Data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const NewPassword = async (
  value: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPAsswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  const expiredToken = new Date(existingToken.expires) < new Date();

  if (expiredToken) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email Does Not exist!" };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashPassword,
    },
  });
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password Updated" };
};
