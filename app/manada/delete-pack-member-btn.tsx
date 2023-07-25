"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const showErrorToast = () => {
  toast({
    title: "Error eliminando miembro",
    description: "Hubo un error eliminando el miembro de tu manada",
    duration: 5000,
    variant: "destructive",
  });
};

export function DeletePackMemberBtn({ memberId }: { memberId: string }) {
  const router = useRouter();

  const handleDeleteConfirmation = async (memberId: string) => {
    try {
      const response = await fetch(`/api/pack/member/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Eliminado",
          description: "Se eliminó el miembro de tu manada",
          duration: 5000,
        });
      } else {
        showErrorToast();
      }

      router.refresh();
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro de querer eliminarlo?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            información de tu perro.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteConfirmation(memberId)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
