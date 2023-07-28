import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import RightNav from "@/components/right-nav";
import { getCurrentUser } from "@/lib/session";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        {/* LEFT SIDE NAV */}

        <MainNav role={user?.role} />
        <MobileNav />

        {/* RIGHT SIDE NAV */}

        <RightNav />
      </div>
    </header>
  );
}
