import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Only run the i18n middleware on:
  // - "/" (redirects to /fr/)
  // - locale-prefixed paths (/fr/*, /nl/*, /en/*)
  // Everything else (/admin, /installer, /api, static files) is left untouched.
  matcher: ["/", "/(fr|nl|en)/:path*"],
};
