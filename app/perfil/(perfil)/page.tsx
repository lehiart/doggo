import { redirect } from 'next/navigation'
import { db } from '@/lib/prisma'

import { Separator } from '@/components/ui/separator'
import {
  ProfileForm,
  ProfileFormProps,
} from '../../../components/profile/profile-form'
import { getCurrentUser } from '@/lib/session'
import { CurrentUserSession } from '@/types/user'
import { Profile, User } from '@prisma/client'

const getEditableUserPofile = async (userId: string) => {
  const userProfile = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      profile: {
        select: {
          id: true,
          bio: true,
          location: true,
          links: true,
          phone: true,
        },
      },
    },
  })

  return userProfile
}

export default async function SettingsProfilePage() {
  const user: CurrentUserSession = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const profile: any = await getEditableUserPofile(user.id)

  if (!profile) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Así es como los demás te verán en el sitio.
        </p>
      </div>
      <Separator />
      <ProfileForm userProfile={profile} />
    </div>
  )
}
