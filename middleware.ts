import { is } from "date-fns/locale";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/registro");

    const isAdminRolePage = req.nextUrl.pathname.startsWith("/dashboard");
    const isNormalRolePage = req.nextUrl.pathname.startsWith("/manada");

    // Auth pages
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Roles based pages, all other pages are available for both roles.
    if (isAdminRolePage && req.nextauth.token?.role === "USER") {
      return NextResponse.redirect(new URL("/manada", req.url));
    }

    if (isNormalRolePage && req.nextauth.token?.role === "COMPANY") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/login",
    "/registro",
    "/perfil/:path*",
    "/manada/:path*",
    "/dashboard/:path*",
  ],
};
