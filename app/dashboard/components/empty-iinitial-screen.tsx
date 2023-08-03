import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function EmptyInitialScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-full space-y-4">
      <span>Agregar el primero</span>
      <Link href="/dashboard/nuevo">
        <Button>Agregar nuevo negocio</Button>
      </Link>
    </div>
  );
}
