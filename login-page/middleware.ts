import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  res.headers.append("Access-Control-Allow-Origin", "*")
}

export const config = {
  matcher: ['/api/:path*']
}