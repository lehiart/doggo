"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOffIcon, EyeIcon, Loader2Icon, Delete } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AppearanceForm } from "./appereance-form";
import { DeleteUserForm } from "./delete-user-form";
import { el } from "date-fns/locale";

const accountFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Los campos de contraseña nueva no coinciden.",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function AccountForm({
  id,
  email,
}: {
  id: string;
  email: string | null;
}) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  function handlePasswordIconClick(buttonName: string) {
    setShowPasswords((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(data: AccountFormValues) {
    setIsSaving(true);

    const payload = {
      password: data.currentPassword,
      newPassword: data.newPassword,
      id,
      email,
    };

    try {
      const result = await fetch("/api/profile/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!result.ok) {
        toast({
          title: "No se pudo actualizar la contraseña.",
          description:
            "Por favor, intenta de nuevo. Si el problema persiste, contacta a soporte.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Contraseña actualizada.",
          description: "Tu contraseña ha sido actualizada con éxito.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "No pudimos actualizar tu contraseña.",
        description:
          "Por favor, intenta de nuevo. Si el problema persiste, contacta a soporte.",
      });
    }

    setIsSaving(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Contraseña</CardTitle>
              <CardDescription>
                Introduce tus datos para cambiar tu contraseña.
              </CardDescription>
            </CardHeader>

            <CardContent className="w-50 grid gap-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña actual</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          className="w-full lg:w-2/3"
                          autoComplete="off"
                          type={
                            showPasswords.showCurrentPassword
                              ? "text"
                              : "password"
                          }
                        />
                        <Button
                          variant="outline"
                          type="button"
                          size="icon"
                          onClick={() =>
                            handlePasswordIconClick("showCurrentPassword")
                          }
                          tabIndex={-1}
                        >
                          <span className="sr-only">Ver contraseña</span>
                          {showPasswords.showCurrentPassword ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          className="w-full lg:w-2/3"
                          autoComplete="off"
                          type={
                            showPasswords.showNewPassword ? "text" : "password"
                          }
                        />
                        <Button
                          variant="outline"
                          type="button"
                          size="icon"
                          onClick={(e) =>
                            handlePasswordIconClick("showNewPassword")
                          }
                          tabIndex={-1}
                        >
                          <span className="sr-only">Ver contraseña</span>
                          {showPasswords.showNewPassword ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirma tu nueva contraseña</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          className="w-full lg:w-2/3"
                          autoComplete="off"
                          type={
                            showPasswords.showConfirmPassword
                              ? "text"
                              : "password"
                          }
                        />
                        <Button
                          variant="outline"
                          type="button"
                          size="icon"
                          onClick={() =>
                            handlePasswordIconClick("showConfirmPassword")
                          }
                          tabIndex={-1}
                        >
                          <span className="sr-only">Ver contraseña</span>
                          {showPasswords.showConfirmPassword ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                disabled={!form.formState.isDirty || isSaving}
              >
                {isSaving ? <Loader2Icon /> : "Cambiar contraseña"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {/* THEME SELECTOR */}

      <AppearanceForm />

      {/* DELETE USER */}

      <DeleteUserForm />
    </div>
  );
}
