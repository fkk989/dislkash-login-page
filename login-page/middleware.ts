import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  res.headers.append("ACCESS-CONTROL-ALLOW-ORIGIN", "*")
}