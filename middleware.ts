import { verifyToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Fetch the token from cookies
  const { pathname } = req.nextUrl;

  console.log("Middleware triggered for:", pathname); // Debugging line

  // Restrict access to /auth pages if a valid token exists
  if (pathname.startsWith("/auth") && token && isValidToken(token)) {
    console.log("Redirecting authenticated user away from /auth pages");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access to /user-dashboard pages only if a valid token exists
  if (pathname.startsWith("/user-dashboard") && (!token || !isValidToken(token))) {
    console.log("Redirecting unauthenticated user away from /user-dashboard");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

const isValidToken = (token: string): boolean => {
  try {
    verifyToken(token); // Validate the token
    return true;
  } catch (error) {
    console.error("Token validation failed:", error); // Debugging line
    return false;
  }
};

export const config = {
  matcher: ["/user-dashboard/:path*", "/auth/:path*"], // Match all paths under /auth and /user-dashboard
};
