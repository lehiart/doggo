'use client'

import { Item } from '@prisma/client'
import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useCategories() {
  const { data, error, isLoading } = useSWR('/api/categories', fetcher)

  return {
    categories: data?.categories || [],
    isLoading,
    isError: error,
  }
}

export function useCompany(id: string | null | undefined) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/company/${id}` : null,
    fetcher,
  )

  return {
    company: data?.company || null,
    isLoading,
    isError: error,
  }
}

export function useCompanyItems(id: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/items/${id}` : null,
    fetcher,
  )

  const removeItem = async (itemId: string) => {
    // Make an API call to delete the item
    const response = await fetch(`/api/items/delete/${itemId}`, {
      method: 'DELETE',
    })

    // Optimistically update the data by removing the item from the list
    if (response.ok && data && data.items) {
      const updatedItems = data.items.filter((item: Item) => item.id !== itemId)
      mutate({ ...data, items: updatedItems }, false)
    }

    return response
  }

  const updateItemPublishStatus = async (
    itemId: string,
    isPublished: boolean,
  ) => {
    const response = await fetch(
      `/api/items/${isPublished ? 'unpublish' : 'publish'}/${itemId}`,
      {
        method: 'PUT',
      },
    )

    if (response.ok && data && data.items) {
      const updatedItems = data.items.map((item: Item) => {
        if (item.id === itemId) {
          return { ...item, published: !isPublished }
        }
        return item
      })

      mutate({ ...data, items: updatedItems }, false)
    }
  }

  return {
    items: data?.items || null,
    isLoading,
    isError: error,
    removeItem,
    updateItemPublishStatus,
  }
}

export function useCompanyOpinions(id: string | null | undefined) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/opinions/${id}` : null,
    fetcher,
  )

  return {
    opinions: data?.opinions || null,
    isLoading,
    isError: error,
  }
}

export function useCompanyClientRequests(id: string | null | undefined) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/client-request/${id}` : null,
    fetcher,
  )

  return {
    clientRequests: data?.clientRequests || null,
    isLoading,
    isError: error,
  }
}
