import React from 'react'
import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DogIcon } from 'lucide-react'
import { DeletePackMemberBtn } from '../../components/pack/pack-form/delete-pack-member-btn'
import EmptyPack from '@/components/pack/empty-pack'

async function MyPackPage() {
  const user = await getCurrentUser()

  if (!user) return

  const myPack = await db.pack.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      members: true,
    },
  })

  return (
    <main className="lg:border-l h-full w-full">
      {myPack?.members.length === 0 ? (
        <EmptyPack />
      ) : (
        <div>
          <p className="mb-4">Estos son los miembros de mi manada:</p>
          <div className="my-4">
            <Link href="manada/nuevo">
              <Button>Agregar nuevo</Button>
            </Link>
          </div>
          <ul>
            {myPack?.members.map((member) => (
              <li key={member.id}>
                <Card className="mb-4 w-[350px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-2">
                    <div>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.breed}</CardDescription>
                    </div>

                    <Avatar>
                      <AvatarImage src={member.imageURL || undefined} />
                      <AvatarFallback>
                        <DogIcon />
                      </AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Link
                      href={`manada/editar/${member.id}`}
                      className="w-full"
                    >
                      <Button className="w-full">Editar</Button>
                    </Link>

                    <DeletePackMemberBtn memberId={member.id} />
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export default MyPackPage
