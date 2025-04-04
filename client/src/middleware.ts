import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent } from "next/server";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  try {
    const hostname = request.headers.get("host");
    const pathname = request.nextUrl.pathname;

    // Handle app subdomain routing first
    // if (hostname === "app.kryptosai.pro") {
    if (hostname === "app.localhost:3000") {
      const url = new URL(request.url);
      if (!pathname.startsWith("/app")) {
        url.pathname = `/app${pathname === "/" ? "" : pathname}`;
        return NextResponse.rewrite(url);
      }
    }

    // Exclude Next.js internals and static files
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon.ico") ||
      pathname.startsWith("/static")
    ) {
      return NextResponse.next();
    }

    // Run Clerk authentication after routing
    return clerkMiddleware()(request, event);
  } catch (error) {
    console.error("Middleware error:", error);

    // Return a generic error response or allow the request to continue
    // depending on your error handling strategy
    return NextResponse.next();

    // Alternatively, you could return an error page:
    // return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
