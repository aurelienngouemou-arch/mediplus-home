import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only redirect root "/" to the default locale "/fr".
// All other routing (locale detection, etc.) is handled at the component level via next-intl.
// Keeping this middleware minimal avoids Vercel Edge runtime host-URL issues.
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/fr", request.nextUrl));
}

export const config = {
  matcher: ["/"],
};
