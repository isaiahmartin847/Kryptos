// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");

  if (hostname === "test.localhost:3000") {
    return NextResponse.rewrite(new URL("/test", request.url));
  }

  return NextResponse.next();
}
