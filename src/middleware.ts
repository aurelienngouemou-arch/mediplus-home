import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /admin (no locale prefix)
     * - /installer (no locale prefix)
     * - /api routes
     * - /_next internals
     * - static files (anything with a dot extension)
     */
    "/((?!admin|installer|api|_next|icons|manifest\\.json|sw\\.js|.*\\..*).*)",
  ],
};
