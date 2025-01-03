import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  // Exclude Next.js internals and static files
  const pathname = request.nextUrl.pathname || "";

  if (
    pathname.startsWith("/_next") || // Exclude internal Next.js requests
    pathname.startsWith("/favicon.ico") || // Exclude favicon requests
    pathname.startsWith("/static") // Exclude static files
  ) {
    return NextResponse.next();
  }

  if (hostname === "app.localhost:3000") {
    return NextResponse.rewrite(new URL("/app", request.url));
  }

  // Allow other requests to continue normally
  return NextResponse.next();
}

// Narrow matcher to apply only to relevant routes
export const config = {
  matcher: "/:path((?!api|static|_next).*)", // Exclude APIs and static assets
};
