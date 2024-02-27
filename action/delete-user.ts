"use server";
import { db } from "@/lib/db";

export const DeleteUser = async (id: string) => {
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return { success: "User Deleted Successful" };
};
