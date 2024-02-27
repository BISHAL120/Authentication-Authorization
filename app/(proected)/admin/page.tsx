"use client";

import { getAllUsers } from "@/Data/get-all-users";
import { admin } from "@/action/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FromSuccess } from "@/components/from-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import AllUsers from "../_components/all-user";
import DeletedUser from "../_components/deleted-users";

const AdminPage = () => {
  const [showuser, setShowuser] = useState(true);
  const [deletedUser, setDeletedUser] = useState(true);
  const [data, setData] = useState<any[]>();
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const LoadUsers = () => {
    setShowuser(!showuser);
    getAllUsers().then((data) => {
      setData(data as any[]);
    });
  };

  const LoadDeletedUser = () => {
    setDeletedUser(!deletedUser);
    getAllUsers().then((data) => {
      setData(data as any[]);
    });
  };

  const onApiRoutesClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed Access");
      } else {
        toast.error("Don't Allowed Access");
      }
    });
  };

  return (
    <>
      <Card className="mb-12 min-w-[800px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">🔑 Admin</p>
        </CardHeader>
        <CardContent className="space-y-7 mt-5">
          <RoleGate allowedRoles={UserRole.ADMIN}>
            <FromSuccess message="You are Allowed To See This Content" />
          </RoleGate>
          <div className="flex flex-row items-center justify-between border shadow-md p-3 rounded-lg">
            <p className="text-sm font-medium">Load All Users</p>
            <Button onClick={LoadUsers}>{showuser ? "Load" : "Hide"}</Button>
          </div>
          {/* {data?.map((user) => (
            <AllUsers key={user.id} user={user} />
          ))} */}
          {!showuser ? <AllUsers data={data} /> : null}
          <div className="flex flex-row items-center justify-between border shadow-md p-3 rounded-lg">
            <p className="text-sm font-medium">Load Deleted User</p>
            <Button onClick={LoadDeletedUser}>
              {deletedUser ? "Load" : "Hide"}
            </Button>
          </div>
          {!deletedUser ? <DeletedUser data={data} /> : null}
          <div className="flex flex-row items-center justify-between border shadow-md p-3 rounded-lg">
            <p className="text-sm font-medium">Admin-Only Server Action</p>
            <Button onClick={onServerActionClick}>Check</Button>
          </div>
          <div className="flex flex-row items-center justify-between border shadow-md p-3 rounded-lg">
            <p className="text-sm font-medium">On API Routes Hits</p>
            <Button onClick={onApiRoutesClick}>Check</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminPage;
