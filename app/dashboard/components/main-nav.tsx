"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDashboardContext } from "./dashboard-context";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const { selectedCompany } = useDashboardContext();

  return (
    <nav className={cn("flex w-full items-center justify-between", className)}>
      <div className="space-x-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary "
        >
          Resumen
        </Link>
        <Link
          href="/dashboard/items"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Servicios y productos
        </Link>
        <Link
          href="/dashboard/clientes"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Clientes
        </Link>
        <Link
          href={`/dashboard/ajustes/${selectedCompany?.id}`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Ajustes
        </Link>
      </div>

      <Link href="/dashboard/nuevo">
        <Button>Agregar nuevo negocio</Button>
      </Link>
    </nav>
  );
}
