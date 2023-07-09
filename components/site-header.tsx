import Link from 'next/link';

import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Twitter, Github, UserCircle2 } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        {/* LEFT NAV */}

        <MainNav />
        <MobileNav />

        {/* RIGHT NAV */}
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="items-center hidden md:flex">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Acceder
              </Button>
            </Link>

            <Link href="/register" className="pl-4 pr-2">
              <Button variant="secondary" size="sm">
                Registrate
              </Button>
            </Link>
          </nav>

          <div className="flex md:hidden">
            <UserCircle2 />
          </div>
        </div>
      </div>
    </header>
  );
}
