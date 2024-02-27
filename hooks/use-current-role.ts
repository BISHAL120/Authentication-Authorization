import { useSession } from "next-auth/react";

export const UseCurrentRole = () => {
  const session = useSession();
  return session?.data?.user?.role;
};
