import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { getCurrentUser } from "@/lib/session";

export default async function SettingsProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Perfil</h3>
        <p className='text-sm text-muted-foreground'>
          Así es como los demás te verán en el sitio.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
