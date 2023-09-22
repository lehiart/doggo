import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Opinion } from '@prisma/client'
import { MessageCircleIcon, MessagesSquareIcon } from 'lucide-react'

interface OpinionsSummaryCardsProps {
  opinions: Opinion[]
}

const calculateAverageRating = (opinions: Opinion[]) => {
  const total = opinions.reduce((a: number, b: Opinion) => a + b.rating, 0)
  const average = total / opinions.length
  return average.toFixed(1)
}

export default function OpinionsSummaryCards({
  opinions,
}: OpinionsSummaryCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-2 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{opinions.length}</div>
          <p className="text-xs text-muted-foreground">opiniones</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio</CardTitle>
          <MessagesSquareIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {calculateAverageRating(opinions)}
          </div>
          <p className="text-xs text-muted-foreground">de calificacion</p>
        </CardContent>
      </Card>
    </div>
  )
}
