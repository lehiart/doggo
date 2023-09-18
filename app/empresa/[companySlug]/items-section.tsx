'use client'

import React, { useState } from 'react'
import { FavoriteItems, Item } from '@prisma/client'
import FavoriteIcon from './favorite-icon-btn'
import AddOpinionDialog from '@/components/dashboard/opinions/add-opinion-dialog'
import { ROLE } from '@/lib/constants'

interface ItemsSectionProps {
  items: Item[]
  userId: string | null | undefined
  userName: string | null | undefined
  role: string | null | undefined
  favoritesList: FavoriteItems[]
}

const convertFavoritesListToObject = (favoritesList: FavoriteItems[]) => {
  const favoritesListObject = favoritesList.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: true,
    }),
    {},
  )

  return favoritesListObject
}

export default function ItemsSection({
  items,
  userId,
  userName,
  role,
  favoritesList,
}: ItemsSectionProps) {
  // Use state to track the favorite status for each item
  const [itemFavorites, setItemFavorites] = useState<{
    [itemId: string]: boolean
  }>(convertFavoritesListToObject(favoritesList))

  // Function to toggle the favorite status of an item
  const toggleFavorite = async (itemId: string) => {
    // Check if the item is already favorited
    if (itemFavorites[itemId]) {
      // Remove the item from favorites
      // You can add your logic here to update the backend database as well
      setItemFavorites((prevFavorites) => ({
        ...prevFavorites,
        [itemId]: false,
      }))
    } else {
      // Add the item to favorites
      // You can add your logic here to update the backend database as well
      setItemFavorites((prevFavorites) => ({
        ...prevFavorites,
        [itemId]: true,
      }))
    }
  }

  return (
    <section>
      {items.map((item: Item) => (
        <div
          key={item.id}
          id={item.title}
          className="flex flex-col items-center space-y-4 border border-gray-200 p-4"
        >
          {/* Only user role can add to favorites list*/}

          {userId && role === ROLE.USER && (
            <FavoriteIcon
              itemId={item.id}
              userId={userId}
              isFavorite={itemFavorites[item.id] || false}
              onToggle={() => toggleFavorite(item.id)} // Pass the toggle function
            />
          )}

          <span>{item.title}</span>

          {/* only user role can add an opinion*/}

          {userId && role === ROLE.USER && (
            <AddOpinionDialog
              itemId={item.id}
              name={item.title}
              companyId={item.companyId}
              userId={userId}
              author={userName || 'Anonimo'}
            />
          )}
        </div>
      ))}
    </section>
  )
}
