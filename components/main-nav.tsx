"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Dog } from "lucide-react";
import { Button } from "./ui/button";

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <div className='mr-4 hidden md:flex'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <Dog className='h-6 w-6' />
          <span className='hidden font-bold sm:inline-block'>Doggo</span>
        </Link>

        <nav className='flex items-center space-x-6 text-sm font-medium'>
          <Link
            href='/manada'
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/docs" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Mi manada
          </Link>
          <Link
            href='/aventuras'
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/aventuras")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Aventuras
          </Link>
          <Link
            href='/entrenadores'
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/examples")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Entrenadores
          </Link>

          <Link
            href='/proveedores'
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
            )}
          >
            Proveedores
          </Link>
        </nav>
      </div>
    </>
  );
}
