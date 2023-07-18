import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { getCurrentUser } from "@/lib/session";
import { EditableUserData, CurrentUserSession } from "@/types/user";

const getEditableUserPofile = async (userId: string) => {
  const userProfile: EditableUserData = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      image: true,
      bio: true,
      links: true,
      phone: true,
      location: true,
    },
  });

  return userProfile;
};

export default async function SettingsProfilePage() {
  const user: CurrentUserSession = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const profile: EditableUserData = await getEditableUserPofile(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Así es como los demás te verán en el sitio.
        </p>
      </div>
      <Separator />
      <ProfileForm userProfile={profile} id={user.id} />
    </div>
  );
}
