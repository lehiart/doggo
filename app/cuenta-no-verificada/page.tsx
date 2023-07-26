"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon, MailCheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { getSession } from "next-auth/react";

function EmailNotVerifiedPage() {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    const session = await getSession();
    setIsSaving(true);

    try {
      if (session) {
        return;
      }

      await fetch("/api/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ email: data.get("email") }),
      });
    } catch (error) {
      toast({
        title:
          "Hubo un error al guardar los datos. Por favor intenta de nuevo.",
        description: "Si el problema persiste, contacta a soporte.",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <Card className="w-[350px] px-4 pb-4 pt-8">
        <CardTitle className="mb-8">Tu cuenta no esta verificada</CardTitle>
        <CardContent>
          <p className="mb-4  text-center	">
            por favor, revisa tu correo, es necesario verificar tu cuenta desde
            el correo para poder iniciar sesion
          </p>

          <Separator className="mb-4" />

          {!isSaving && (
            <p className="  text-center	">
              Si no encuentras el correo, puedes solicitar uno nuevo
              introduciendo tu correo en el siguiente campo:
            </p>
          )}
        </CardContent>
        <CardFooter className="w-full">
          {isSaving ? (
            <CheckCircleIcon
              color="green"
              className="mt-4 flex w-full items-center justify-center"
            />
          ) : (
            <form action={onSubmit} className="w-full space-y-4">
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="tu correo con el que te registraste"
                  required
                />
              </div>

              <Button
                disabled={isSaving}
                type="submit"
                className="w-full gap-2"
              >
                <MailCheckIcon /> Reenviar email
              </Button>
            </form>
          )}
        </CardFooter>
      </Card>
    </section>
  );
}

export default EmailNotVerifiedPage;
