import React from 'react'
import Link from 'next/link'
import { UserAccountNav } from '@/components/site-header/user-account-nav'
import { getCurrentUser } from '@/lib/session'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

async function RightNav() {
  const user = await getCurrentUser()

  return (
    <div className="flex space-x-2">
      {user ? (
        <div className="flex">
          <UserAccountNav user={user} />
        </div>
      ) : (
        <>
          <nav className="hidden items-center md:flex">
            <Link
              href="/login"
              className={cn('mr-4', buttonVariants({ variant: 'ghost' }))}
            >
              Iniciar sesión
            </Link>

            <Link
              href="/registro"
              className={cn(
                'pl-4 pr-2',
                buttonVariants({ variant: 'secondary' }),
              )}
            >
              Registrate
            </Link>
          </nav>

          <nav className="md:hidden">
            <Link
              href="/login"
              className={buttonVariants({ variant: 'secondary' })}
            >
              Iniciar sesión
            </Link>
          </nav>
        </>
      )}
    </div>
  )
}

export default RightNav
