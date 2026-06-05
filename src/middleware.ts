import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rewrite /installer → /fr/installer internally.
// Using rewrite (not redirect) avoids Vercel Edge Runtime localhost host issue.
// The browser URL stays /installer but serves /fr/installer content.
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/fr/installer";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/installer"],
};
