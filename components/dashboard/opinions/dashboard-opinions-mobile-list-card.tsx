import React from 'react'
import { UserOpinionsQuery } from '@/app/manada/opiniones/page'
import { StarIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface MobileListCardProps {
  opinion: UserOpinionsQuery
  position: number
}

const parseDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-mx', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const createStars = (rating: number) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <StarIcon
        key={index}
        fill={index < rating ? 'yellow' : 'none'}
        className={`h-4 w-4 inline-flex ${
          index < rating ? '' : 'opacity-20 dark:opacity-50'
        }`}
      />
    ))

  return stars
}

export default function DashboardOpinionsMobileListCard({
  opinion,
  position,
}: MobileListCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 grid grid-cols-[1fr_50px] items-center">
          Opinion {`#${position + 1}`}
        </CardTitle>

        <CardDescription className="break-words text-md py-2">
          {opinion.comment}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardDescription className="break-words text-sm">
          Servicio: <span className="break-words">{opinion.itemName}</span>
        </CardDescription>

        <div className="flex space-x-4 text-sm text-muted-foreground justify-between">
          <div className="flex items-center">
            <span className="mr-1 text-bold text-md">{opinion.rating}</span>
            {createStars(opinion.rating)}
          </div>
          <div>{parseDate(opinion.createdAt)}</div>
        </div>
      </CardContent>
    </Card>
  )
}
