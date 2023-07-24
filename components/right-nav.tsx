"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserAccountNav } from "@/components/user-account-nav";

function RightNav() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-1 items-center justify-end space-x-2">
      {session?.user ? (
        <div className="flex">
          <UserAccountNav user={session.user} />
        </div>
      ) : (
        <>
          <nav className="hidden items-center md:flex">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Acceder
              </Button>
            </Link>

            <Link href="/registro" className="pl-4 pr-2">
              <Button variant="secondary" size="sm">
                Registrate
              </Button>
            </Link>
          </nav>

          <nav className="md:hidden">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Acceder
              </Button>
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}

export default RightNav;
