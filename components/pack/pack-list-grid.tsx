import React from 'react'
import { PackMember } from '@prisma/client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { PackMemberButtons } from './pack-form/pack-member-buttons'

interface PackListGridProps {
  myPack: PackMember[]
}

export default function PackListGrid({ myPack }: PackListGridProps) {
  return (
    <div id="pack-list" className="md:py-4 lg:pl-8 lg:pr-0 lg:mt-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {myPack.map((member: PackMember) => (
          <li key={member.id}>
            <Card>
              <CardHeader className="relative h-52">
                <Image
                  src={member.imageURL || '/images/dog-placeholder.jpg'}
                  alt={`Foto de ${member.name}`}
                  fill
                  objectFit="cover"
                  className="rounded-t-md"
                />
              </CardHeader>

              <CardHeader className="flex flex-col">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>
                  Edad:{' '}
                  {member.age.startsWith('0.')
                    ? `${member.age.split('.')[1]} meses`
                    : `${member.age} años`}
                </CardDescription>
                <CardDescription>Raza: {member.breed}</CardDescription>
                <CardDescription>
                  {member.gender === 'female' ? 'Hembra' : 'Macho'}
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <PackMemberButtons memberId={member.id} />
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
