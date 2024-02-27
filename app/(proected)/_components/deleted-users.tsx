"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaUndo, FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { FromError } from "@/components/from-error";
import { UndoDeleteUser } from "@/action/undo-delete-uder";

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

const DeletedUser: React.FC<userProps> = ({ data }) => {
  const hasDeletedUsers = data?.some((user) => user.isDeleted);

  if (!hasDeletedUsers) {
    return <FromError message="No Deleted User Available" />;
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
              user.isDeleted && (
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
                        UndoDeleteUser(user?.id).then((res) => {
                          toast.success(res.success);
                        });
                      }}
                    >
                      <FaUndo className="w-4 h-4" />
                      <span className="sr-only">Undo</span>
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

export default DeletedUser;
