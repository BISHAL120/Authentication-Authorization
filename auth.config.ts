import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/Credentials";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import bcrypt from "bcryptjs";

import { LoginScheme } from "@/schemas";
import { getUserByEmail } from "@/Data/user";

export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const valildatedFields = LoginScheme.safeParse(credentials);

        if (valildatedFields.success) {
          const { email, password } = valildatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
