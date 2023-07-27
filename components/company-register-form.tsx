"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

const showErrorToast = () => {
  toast({
    title: "Oh no! Algo salió mal.",
    description:
      "Tu registro falló. Por favor, inténtalo de nuevo. Si el problema persiste, contactenos.",
    variant: "destructive",
  });
};

export function CompanyRegistrationForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handlePasswordIconClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/register/company", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email.toLowerCase(),
          password: data.password,
        }),
      });

      setIsLoading(false);

      if (!response.ok) {
        showErrorToast();
      } else {
        return toast({
          title: "Revise su correo electrónico ",
          description:
            "Hemos enviado un enlace para confirmar su correo electrónico. Asegúrese de revisar su bandeja de correo no deseado.",
        });
      }
    } catch (error) {
      showErrorToast();
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Nombre
            </Label>

            <Input
              id="name"
              placeholder="Nombre"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name")}
            />

            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              placeholder="nombre@correo.com"
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

          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Registrarse como empresa
          </Button>
        </div>
      </form>
    </div>
  );
}
