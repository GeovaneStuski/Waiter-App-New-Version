import { cookiesName } from "@/utils/cookiesNames";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ['signin'];

export function authMiddleware(req: NextRequest, callback: () => void) {
  const url = req.nextUrl;
  const mainEndpoint = url.pathname.split('/')[1];
  const token = req.cookies.get(cookiesName['NEXT_AUTH_AUTHORIZATION']);

  if (publicRoutes.includes(mainEndpoint)) {
    if (token) {
      url.pathname = '/home'
      return NextResponse.redirect(url)
    }
  } else {
    if (!token) {
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }
  }

  return callback();
}