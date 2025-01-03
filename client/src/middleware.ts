// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware running smooth");
  const hostname = request.headers.get("host");
  console.log("Hostname:", hostname);

  if (hostname === "test.localhost:3000") {
    return NextResponse.rewrite(new URL("/test", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
