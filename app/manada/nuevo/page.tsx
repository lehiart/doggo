import { getCurrentUser } from "@/lib/session";
import AddMemberForm from "../add-member-form";

export default async function AddNewMemberPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Agrega un nuevo miembro</h1>
      <AddMemberForm id={user?.id} />
    </div>
  );
}
