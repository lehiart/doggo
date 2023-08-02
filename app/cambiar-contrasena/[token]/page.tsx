"use client";

import React from "react";
import z from "zod";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setNewPassword } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formDataSchema = z
  .object({
    newPassword: z.string().min(1, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(1, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Los campos de contraseña nueva no coinciden.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formDataSchema>;

const showErrorToast = () => {
  toast({
    title:
      "Hubo un error al actualizar la contraseña. Por favor intenta de nuevo.",
    description: "Si el problema persiste, contacta a soporte.",
    variant: "destructive",
  });
};

export default function ChangePasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const [showPasswords, setShowPasswords] = React.useState<
    Record<string, boolean>
  >({
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    shouldUseNativeValidation: true,
    resolver: zodResolver(formDataSchema),
  });

  function handlePasswordIconClick(buttonName: string) {
    setShowPasswords((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  }

  async function onSubmit(data: FormData) {
    try {
      const response = await setNewPassword(data, params.token);
      reset();

      if (response?.status === 200) {
        toast({
          title:
            "Se ha actualizado tu contraseña. Inicia sesión con tu nueva contraseña",
        });
      } else {
        showErrorToast();
      }
    } catch (error) {
      showErrorToast();
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cambia tu contraseña
            </h1>
            <p className="text-sm text-muted-foreground">
              Introduce tu nueva contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 grid gap-1 space-y-4">
              <Label className="sr-only" htmlFor="newPassword">
                Contraseña
              </Label>

              <div className="flex-column flex gap-1 ">
                <Input
                  id="newPassword"
                  placeholder="Contraseña"
                  type={showPasswords.showNewPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("newPassword")}
                />
                <Button
                  variant="outline"
                  type="button"
                  size="icon"
                  onClick={() => handlePasswordIconClick("showNewPassword")}
                  tabIndex={-1}
                  disabled={isSubmitting}
                >
                  <span className="sr-only">Ver contraseña</span>
                  {showPasswords.showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>

              <div className="mb-2 grid gap-1">
                <Label className="sr-only" htmlFor="confirmPassword">
                  Confirma tu nueva contraseña
                </Label>

                <div className="flex-column flex gap-1">
                  <Input
                    id="confirmPassword"
                    placeholder="Contraseña"
                    type={
                      showPasswords.showConfirmPassword ? "text" : "password"
                    }
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isSubmitting}
                    {...register("confirmPassword")}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    size="icon"
                    onClick={() =>
                      handlePasswordIconClick("showConfirmPassword")
                    }
                    tabIndex={-1}
                    disabled={isSubmitting}
                  >
                    <span className="sr-only">Ver contraseña</span>
                    {showPasswords.showConfirmPassword ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
