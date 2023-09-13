'use client'

import React from 'react'
import { HeartIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface FavoriteIconProps {
  itemId: string
  userId: string
  isFavorite: boolean
  onToggle: (itemId: string) => void
}

export default function FavoriteIcon({
  itemId,
  userId,
  isFavorite,
  onToggle,
}: FavoriteIconProps) {
  const router = useRouter()

  async function handleIconClick(
    itemId: string,
    userId: string,
    isFavorite: boolean,
  ) {
    console.log(itemId, userId, isFavorite)
    if (!userId || !itemId) {
      return
    }

    onToggle(itemId)

    try {
      if (isFavorite) {
        await fetch(`/api/favorites/items/${itemId}`, {
          method: 'DELETE',
        })
      } else {
        await fetch('/api/favorites/items', {
          method: 'POST',
          body: JSON.stringify({ userId, itemId }),
        })
      }

      // router.refresh()

      toast({
        title: 'Éxito',
        description: `Se ${isFavorite ? 'eliminó de' : 'agregó a'} favoritos`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo agregar a favoritos',
        variant: 'destructive',
      })
    }
  }

  return (
    <HeartIcon
      fill={isFavorite ? 'red' : 'none'}
      color={isFavorite ? 'red' : 'currentColor'}
      className="h-4 w-4 cursor-pointer hover:opacity-50 transition-opacity"
      onClick={() => handleIconClick(itemId, userId, isFavorite)}
    />
  )
}
