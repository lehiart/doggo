import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mi manada",
  description:
    "Administra tu manada, agrega miembros, edita sus datos y elimina miembros",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="block min-h-screen space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Mi manada</h2>
        <p className="text-muted-foreground">
          Sobre mi mandada y los miembros que la conforman.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
