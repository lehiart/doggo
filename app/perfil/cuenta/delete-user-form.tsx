"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2Icon, UserX2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const keyword: string = "Eliminar cuenta";

const accountDeleteFormSchema = z.object({
  confirmation: z.literal(keyword, {
    errorMap: () => ({
      message: `Debes escribir la palabra "${keyword}" de manera exacta.`,
    }),
  }),
  password: z.string().min(2, {
    message: "Este campo es requerido.",
  }),
});

type AccountDeleteFormValues = z.infer<typeof accountDeleteFormSchema>;

const defaultValues: Partial<AccountDeleteFormValues> = {
  confirmation: "",
  password: "",
};

export function DeleteUserForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<AccountDeleteFormValues>({
    resolver: zodResolver(accountDeleteFormSchema),
    defaultValues,
  });

  async function onSubmit(data: AccountDeleteFormValues) {
    setIsSaving(true);

    //TODO: CREATE DELETE USER  ROUTE.TS

    toast({
      title: "Cuenta eliminada",
      description: "Tu cuenta ha sido eliminada.",
    });

    setIsSaving(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eliminar mi cuenta</CardTitle>
        <CardDescription>Esta accion no se puede deshacer.</CardDescription>
        <CardDescription>
          Se eliminaran todos tus datos y no podras recuperarlos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" type="button">
              <UserX2Icon className="mr-2 h-4 w-4" />
              Eliminar cuenta
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Eliminar cuenta</DialogTitle>
              <DialogDescription asChild>
                <p className="mt-4">{` Nos entristece que te vayas :(`}</p>
              </DialogDescription>
              <DialogDescription>
                {` Pero si estas seguro de eliminar tu
                cuenta, escribe la palabra "${keyword}" y presiona el botón
                de confirmar.`}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contraseña
                </Label>
                <Input
                  id="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background
                   px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
                   file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 lg:w-2/3"
                  autoComplete="off"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirmacion
                </Label>
                <Input
                  id="confirmation"
                  className="flex h-10 w-full rounded-md border
                   border-input bg-background px-3 py-2 text-sm ring-offset-background
                    file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:w-2/3"
                  autoComplete="off"
                  {...register("confirmation")}
                />
                {errors.confirmation && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.confirmation.message}
                  </p>
                )}
              </div>

              <DialogFooter className="mt-4 gap-4">
                <DialogClose asChild>
                  <Button type="button">Cancelar</Button>
                </DialogClose>

                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isSaving || !isValid}
                >
                  {isSaving ? <Loader2Icon /> : "Confirmar cancelacion"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
