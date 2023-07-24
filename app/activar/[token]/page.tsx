"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { XCircleIcon, CheckIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "next-auth/react";

enum ActivationStatus {
  INVALID = "INVALID",
  EXPIRED = "EXPIRED",
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
}

const MessageCard = ({ status }: { status: ActivationStatus }) => {
  if (status === ActivationStatus.LOADING) {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-center">Verificando email...</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center justify-center space-x-4 rounded-md border p-4">
            <Loader2Icon className="animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === ActivationStatus.INVALID) {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-center">Token invalido</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center justify-center space-x-4 rounded-md border p-4">
            <XCircleIcon />
            <CardDescription>
              El token de activacion es invalido o ya ha sido utilizado.
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === ActivationStatus.EXPIRED) {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-center">Token expirado</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center justify-center space-x-4 rounded-md border p-4">
            <XCircleIcon />
            <CardDescription>
              El token de activacion ha expirado o ya ha sido utilizado.
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="text-center">Email verificado</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center justify-center space-x-4 rounded-md border p-4">
          <CheckIcon />
          <CardDescription>
            El email ha sido verificado correctamente.
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/login">
          <Button className="w-full">Ir a la pagina principal</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const ActivateTokenPage = ({ params }: { params: { token: string } }) => {
  const [activationStatus, setActivationStatus] = useState<ActivationStatus>(
    ActivationStatus.LOADING
  );

  const { token } = params;
  const handleTokenActivation = async (token: string) => {
    if (!token) {
      setActivationStatus(ActivationStatus.INVALID);
      return;
    }

    try {
      const result = await fetch("/api/auth/activate", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      console.log("el result es: ", result);

      if (result.status === 403) {
        setActivationStatus(ActivationStatus.INVALID);
        return;
      }

      if (result.status === 401) {
        setActivationStatus(ActivationStatus.EXPIRED);
        return;
      }

      signOut({ redirect: false });
      setActivationStatus(ActivationStatus.SUCCESS);
    } catch (error) {
      setActivationStatus(ActivationStatus.INVALID);
    }
  };

  useEffect(() => {
    handleTokenActivation(token);
  }, [token]);

  return (
    <div className="h-screen">
      <MessageCard status={activationStatus} />
    </div>
  );
};

export default ActivateTokenPage;
