"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon, InfoIcon, Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  INVALID_CREDENTIALS_MSG,
  NOT_VERIFIED_EMAIL_MSG,
  ROLE,
} from "@/lib/constants";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function CompanyAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  function handlePasswordIconClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      role: ROLE.COMPANY,
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (signInResult?.error) {
      if (signInResult.error === INVALID_CREDENTIALS_MSG) {
        return toast({
          title: "Revise sus credenciales",
          description:
            "Por favor, compruebe que ha introducido correctamente su correo electrónico y su contraseña.",
          variant: "destructive",
        });
      }

      if (signInResult.error === NOT_VERIFIED_EMAIL_MSG) {
        router.push("/cuenta-no-verificada");
        return;
      }

      return toast({
        title: "Algo salió mal.",
        description:
          "Tu inicio de sesión falló. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }

    router.refresh();
    router.push(searchParams?.get("from") || "/dashboard");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />

            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-2 grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Contraseña
            </Label>

            <div className="flex-column flex gap-1">
              <Input
                id="password"
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => handlePasswordIconClick(e)}
                tabIndex={-1}
                disabled={isLoading}
              >
                <span className="sr-only">Ver contraseña</span>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>

            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar sesión como negocio
          </Button>
        </div>
      </form>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Por seguridad, el inicio de sesión con redes sociales está
          deshabilitado para empresas.
        </AlertDescription>
      </Alert>
    </div>
  );
}
