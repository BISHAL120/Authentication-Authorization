"use client";

import { Logout } from "@/action/logout";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onclick = () => {
    Logout();
  };

  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
};
