import { getCurrentUser } from "@/lib/session";
import AddMemberForm from "../../../components/add-member-form";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AddNewMemberPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <Link href="/manada" className="">
        <Button>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Atras
        </Button>
      </Link>

      <h1>Agrega un nuevo miembro</h1>

      <AddMemberForm id={user?.id} />
    </div>
  );
}
