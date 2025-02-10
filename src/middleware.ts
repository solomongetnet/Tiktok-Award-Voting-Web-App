"use server";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const _auth = await auth();

  console.log(_auth);
  const isAuthenticated = !!token;

  // If user is not admin or is not authenticated, redirect them to not found page
  if (url.pathname.startsWith("/admin") || url.pathname.includes("admin")) {
    if (!isAuthenticated || token.role !== "ADMIN" || !token?.role) {
      url.pathname = "/not-found";
      return NextResponse.redirect(url);
    }
  }

  // If user is authenticated, redirect them away from login and signup pages
  if (isAuthenticated && url.pathname.includes("auth")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If user is not authenticated, redirect them to login page if they try to access protected routes
  if (!isAuthenticated && url.pathname.includes("account")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Allow all other paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"], // Apply middleware to these paths
};
