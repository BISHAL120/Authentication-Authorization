"use server";
import { db } from "@/lib/db";

export const getAllUsers = async () => {
  try {
    const Users = await db.user.findMany();
    return Users;
  } catch (err) {
    return err;
  }
};
