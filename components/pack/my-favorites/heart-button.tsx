import React from 'react'
import { HeartIcon } from 'lucide-react'

export default function HeartButton() {
  return (
    <HeartIcon
      className="absolute right-2 top-1 w-6 h-6 hover:cursor-pointer hover:opacity-80 "
      fill="red"
      color="red"
    />
  )
}
