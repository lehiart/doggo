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
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

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
        <section>
          <div className="flex flex-col justify-between w-full items-center space-y-4 mb-4">
            <p className="text-xl font-bold text-center md:text-left mb-4">
              Estos son los miembros de tu manada
            </p>
            <Link href="manada/nuevo">
              <Button>Agregar nuevo</Button>
            </Link>
          </div>

          <Separator className="my-8 lg:hidden" />

          <div id="pack-list" className="p-4 lg:mt-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {myPack?.members.map((member) => (
                <li key={member.id}>
                  <Card className="mb-4">
                    <CardHeader className="flex flex-row items-center justify-between space-y-2">
                      {member.imageURL && (
                        <Image
                          src={member.imageURL}
                          width={300}
                          height={200}
                          alt="aaaaa"
                        />
                      )}

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
        </section>
      )}
    </main>
  )
}

export default MyPackPage
