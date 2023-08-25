'use client'

import React from 'react'
import { HeartIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface AddToFavoriteIconProps {
  itemId: string
  userId: string
  filled: boolean
}

export default function AddToFavoriteIcon({
  itemId,
  userId,
  filled,
}: AddToFavoriteIconProps) {
  const router = useRouter()

  async function handleIconClick(
    itemId: string,
    userId: string,
    filled: boolean,
  ) {
    if (!userId || !itemId) {
      return
    }

    try {
      if (filled) {
        await fetch(`/api/favorites/items/${itemId}`, {
          method: 'DELETE',
        })
      } else {
        await fetch('/api/favorites/items', {
          method: 'POST',
          body: JSON.stringify({ userId, itemId }),
        })
      }

      router.refresh()

      toast({
        title: 'Éxito',
        description: `Se ${filled ? 'eliminó de' : 'agregó a'} favoritos`,
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
      fill={filled ? 'red' : 'none'}
      color={filled ? 'red' : 'white'}
      className="h-4 w-4 cursor-pointer hover:opacity-50 transition-opacity dark:border-white"
      onClick={() => handleIconClick(itemId, userId, filled)}
    />
  )
}
