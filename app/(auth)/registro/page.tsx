import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserRegisterForm } from "@/components/user-register-form";
import { DogIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyRegistrationForm } from "@/components/company-register-form";

export const metadata = {
  title: "Crea una cuenta",
  description: "Crea una cuenta en Doghouse.",
};

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        <Button variant="ghost">Iniciar </Button>
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <DogIcon className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Crea una cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Introduce tus datos para crear tu cuenta
            </p>
          </div>

          <Tabs defaultValue="user" className="min-h-[356px]">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="user">Usuario</TabsTrigger>
              <TabsTrigger value="company">Empresa</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <UserRegisterForm />
            </TabsContent>
            <TabsContent value="company">
              <CompanyRegistrationForm />
            </TabsContent>
          </Tabs>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Al hacer clic en Continuar, acepta nuestros{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terminos de servicio
            </Link>{" "}
            y{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
