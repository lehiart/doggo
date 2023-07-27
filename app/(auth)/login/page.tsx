import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { ChevronLeft, Dog } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyAuthForm } from "@/components/company-auth-form";

export const metadata: Metadata = {
  title: "Inicia sesión",
  description: "Inicia sesión en tu cuenta de Doghouse.",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/">
        <Button
          variant="ghost"
          className="absolute left-4 top-4 md:left-8 md:top-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Atras
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Dog className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bienvenido de vuelta
          </h1>
          <p className="text-sm text-muted-foreground">
            Introduce tus datos para iniciar sesión en tu cuenta
          </p>
        </div>

        <Tabs defaultValue="user" className="min-h-[356px]">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="user">Usuario</TabsTrigger>
            <TabsTrigger value="company">Negocio</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <UserAuthForm />
          </TabsContent>
          <TabsContent value="company">
            <CompanyAuthForm />
          </TabsContent>
        </Tabs>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/registro"
            className="hover:text-brand underline underline-offset-4"
          >
            No tienes una cuenta? Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
