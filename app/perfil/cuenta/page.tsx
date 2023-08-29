import { AccountForm } from '@/components/profile/account-form'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/session'
import { CurrentUserSession } from '@/types/user'
import { redirect } from 'next/navigation'

export default async function SettingsAccountPage() {
  const user: CurrentUserSession = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza la configuración de tu cuenta.
        </p>
      </div>

      <Separator />

      <AccountForm id={user.id} email={user.email} role={user.role} />
    </div>
  )
}
