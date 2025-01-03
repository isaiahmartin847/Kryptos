import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  // Rewrite to /test path only if the hostname matches
  if (hostname === "test.localhost:3000") {
    return NextResponse.rewrite(new URL("/test", request.url));
  }

  // Allow other requests to continue normally
  return NextResponse.next();
}

// Simplified matcher configuration
export const config = {
  matcher: "/:path*", // Apply to all paths
};
