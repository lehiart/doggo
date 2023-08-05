import { getCurrentUser } from '@/lib/session'
import PackMemberForm from '../../../../components/pack-form/pack-member-form'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PackMember, User } from '@prisma/client'
import { db } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'

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
      <Link href="/manada" className="">
        <Button>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Atras
        </Button>
      </Link>

      <h1>Editar miembro</h1>

      <PackMemberForm id={user?.id} type="EDIT" member={member} />
    </div>
  )
}
