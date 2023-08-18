import { MainNav } from '@/components/site-header/main-nav'
import { MobileNav } from '@/components/site-header/mobile-nav'
import RightNav from '@/components/site-header/right-nav'
import { getCurrentUser } from '@/lib/session'

export async function SiteHeader() {
  const user = await getCurrentUser()

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        {/* LEFT SIDE NAV */}

        <MainNav role={user?.role} />
        <MobileNav role={user?.role} />

        {/* RIGHT SIDE NAV */}

        <RightNav />
      </div>
    </header>
  )
}
