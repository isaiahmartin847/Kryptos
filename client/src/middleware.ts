import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent } from "next/server";

// Run Clerk middleware first
const clerkAuth = clerkMiddleware();

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const hostname = request.headers.get("host");
  const pathname = request.nextUrl.pathname;

  // Handle app subdomain routing first
  if (hostname === "app.localhost:3000") {
    // Create a new URL for the rewrite
    const url = new URL(request.url);
    // Only prepend /app if it's not already there
    if (!pathname.startsWith("/app")) {
      url.pathname = `/app${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Run Clerk authentication after routing
  const clerkResponse = await clerkAuth(request, event);
  if (clerkResponse) {
    return clerkResponse;
  }

  // Exclude Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Allow other requests to continue normally
  return NextResponse.next();
}

// Combined matcher configuration that satisfies both Clerk and custom routing needs
export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
