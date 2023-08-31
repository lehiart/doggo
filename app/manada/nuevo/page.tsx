import { getCurrentUser } from '@/lib/session'
import PackMemberForm from '../../../components/pack/pack-form/pack-member-form'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function AddNewMemberPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <Link
        href="/manada"
        className={cn(
          buttonVariants({
            variant: 'outline',
          }),
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        Regresar
      </Link>

      <h2 className="font-bold text-2xl mb-12 animate-slide-down text-center mt-12">
        Agrega un nuevo miembro
      </h2>

      <PackMemberForm userId={user.id} type="NEW" />
    </div>
  )
}
