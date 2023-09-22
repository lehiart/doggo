import React from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckIcon, CopyIcon } from 'lucide-react'

interface CopyToClipboardInputProps {
  title: string
  url: string
}

export default function CopyToClipboardInput({
  title,
  url,
}: CopyToClipboardInputProps) {
  const [showCopyAnimation, setShowCopyAnimation] = React.useState(false)

  const copyLink = () => {
    setShowCopyAnimation(true)

    navigator.clipboard.writeText(url)

    setTimeout(() => {
      setShowCopyAnimation(false)
    }, 2000)
  }

  return (
    <h3 className="text-center mb-12 text-xl mt-4">
      {title}
      <div className="flex space-x-2 mt-4">
        <Input value={url} readOnly />
        <Button
          variant="secondary"
          className="shrink-0"
          onClick={() => copyLink()}
        >
          {showCopyAnimation ? (
            <CheckIcon className="animate-pulse h-4 w-4 mr-2" />
          ) : (
            <CopyIcon className="h-4 w-4 mr-2" />
          )}
          {showCopyAnimation ? 'Copiado' : 'Copiar'}
        </Button>
      </div>
    </h3>
  )
}
