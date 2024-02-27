"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { UseCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const role = UseCurrentRole();

  return (
    <nav className="bg-secondary flex justify-between items-center rounded-lg p-4 w-full flex-wrap gap-3 md:w-[600px] shadow-sm">
      <div className="flex gap-5 flex-wrap justify-center">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        {role === UserRole.ADMIN && (
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        )}
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <div className="mx-auto sm:mx-0">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
