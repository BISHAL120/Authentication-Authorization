"use server";
import { db } from "@/lib/db";

export const UndoDeleteUser = async (id: string) => {
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: false,
    },
  });
  return { success: "User Undo Successful" };
};
