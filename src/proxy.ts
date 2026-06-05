import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl;

  // Rewrite /installer to /fr/installer without a client-side redirect
  if (pathname === "/installer") {
    return NextResponse.rewrite(new URL("/fr/installer", req.url));
  }

  if (pathname.startsWith("/admin")) {
    const isAuthenticated = !!req.auth;
    const isLoginPage = pathname === "/admin/login";

    if (!isLoginPage && !isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(req as NextRequest);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
