import { getCurrentUser } from '@/lib/session'
import PackMemberForm from '../../../components/pack/pack-form/pack-member-form'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AddNewMemberPage() {
  const user = await getCurrentUser()

  return (
    <div>
      <Link href="/manada">
        <Button variant="outline">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Regresar
        </Button>
      </Link>

      <h2 className="font-bold text-2xl mb-12 animate-slide-down text-center mt-12">
        Agrega un nuevo miembro
      </h2>

      <PackMemberForm id={user?.id} type="NEW" />
    </div>
  )
}
