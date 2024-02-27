import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type ExtendUser = DefaultSession["user"] & {
  role: UserRole;
};

interface UserInfoProps {
  user?: ExtendUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div>
      <Card className="w-[800px] shadow-sm">
        <CardHeader>
          <p className="text-2xl p-5 font-semibold text-center">{label}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-row items-center justify-between border rounded-lg p-2 shadow-sm">
            <p className="text-sm font-medium ml-3">ID</p>
            <p className="truncate max-w-40 py-1 px-3 font-mono text-sm rounded-md bg-slate-200">
              {user?.id}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between border rounded-lg p-2 shadow-sm">
            <p className="text-sm font-medium ml-3">Name</p>
            <p className="truncate max-w-40 py-1 px-3 font-mono text-sm rounded-md bg-slate-200">
              {user?.name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between border rounded-lg p-2 shadow-sm">
            <p className="text-sm font-medium ml-3">Email</p>
            <p className="truncate max-w-40 py-1 px-3 font-mono text-sm rounded-md bg-slate-200">
              {user?.email}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between border rounded-lg p-2 shadow-sm">
            <p className="text-sm font-medium ml-3">Role</p>
            <p className="truncate max-w-40 py-1 px-3 font-mono text-sm rounded-md bg-slate-200">
              {user?.role}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between border rounded-lg p-2 shadow-sm">
            <p className="text-sm font-medium ml-3">TwoFactor Authentication</p>
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
