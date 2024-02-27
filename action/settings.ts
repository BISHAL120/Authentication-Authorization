"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/Data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export const Settings = async (value: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    value.email = undefined;
    value.password = undefined;
    value.newPassword = undefined;
    value.isTwoFactorEnabled = undefined;
  }

  if (value.email && value.email !== user.email) {
    const existingUser = await getUserByEmail(value.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exists!" };
    }

    const verificationToken = await generateVerificationToken(value.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification Email Sent" };
  }

  if (value.password && value.newPassword && dbUser.password) {
    const hashMatch = await bcrypt.compare(value.password, dbUser.password);
    if (!hashMatch) {
      return { error: "Incorrect previous password" };
    }

    const hashPassword = await bcrypt.hash(value.newPassword, 10);

    value.password = hashPassword;
    value.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...value,
    },
  });
  return { success: "Settings Updated!" };
};
