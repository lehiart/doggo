import { getCurrentUser } from '@/lib/session'
import PackMemberForm from '../../../../components/pack/pack-form/pack-member-form'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { PackMember, User } from '@prisma/client'
import { db } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { cn } from '@/lib/utils'

async function getMemberData(memberId: PackMember['id']) {
  return await db.packMember.findFirst({
    where: {
      id: memberId,
    },
  })
}

interface MemberEditorPageProps {
  params: { memberId: string }
}

export default async function EditMemberPage({
  params,
}: MemberEditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const member = await getMemberData(params.memberId)

  if (!member) {
    notFound()
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
        Editar miembro
      </h2>

      <PackMemberForm userId={user.id} type="EDIT" member={member} />
    </div>
  )
}
