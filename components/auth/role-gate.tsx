"use client";

import { UseCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FromError } from "../from-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = UseCurrentRole();
  if (role !== allowedRoles) {
    return (
      <FromError message="You Don't have Permission To View This Contain!" />
    );
  }
  return <>{children}</>;
};
