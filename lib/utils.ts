import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { statesOfMexico } from './states-of-mexico'
import { CATEGORIES_NAME } from './categories'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str: string): string {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

export const normalizeString = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '') // Remove accents and special characters

export const getStateFromKey = (stateKey: string) => {
  return statesOfMexico.find((state) => state.value === stateKey)
}

export function getCategoryNameFromSlug(
  categorySlug: string,
): string | undefined {
  const category = CATEGORIES_NAME.find(
    (category) => slugify(category.name) === categorySlug,
  )

  return category?.name
}

export function getStateNameFromSlug(stateSlug: string): string | undefined {
  const state = statesOfMexico.find((state) => state.slug === stateSlug)

  return state?.label
}

export const getStateValueFromSlug = (slug: string) => {
  const state = statesOfMexico.find((state) => state.slug === slug)

  return state?.value
}
