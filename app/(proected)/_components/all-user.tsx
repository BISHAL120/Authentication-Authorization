"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaTrash, FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteUser } from "@/action/delete-user";
import { toast } from "sonner";
import { FromError } from "@/components/from-error";

interface userProps {
  data?: userType[];
}
interface userType {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  isDeleted: boolean;
}

const AllUsers: React.FC<userProps> = ({ data }) => {
  const hasNonDeletedUsers = data?.some((user) => !user.isDeleted);

  if (!hasNonDeletedUsers) {
    return <FromError message="No User Available" />;
  }
  return (
    <div className="bg-white border shadow-md rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[120px]">Role</TableHead>
            <TableHead className="w-[180px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(
            (user) =>
              !user.isDeleted && (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell className="font-medium">{user?.email}</TableCell>
                  <TableCell className="font-medium">{user?.role}</TableCell>
                  <TableCell className="space-x-2 text-center">
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        DeleteUser(user?.id).then((res) => {
                          toast.success(res.success);
                        });
                      }}
                    >
                      <FaTrash className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;
