
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jwt";

export const config = {
  matcher: ["/admin-dashboard", "/admin-dashboard/:path*", "/admin-login"],
};

export async function middleware(req: NextRequest) {
  console.log("Request URL:", req.url);

  const token = req.cookies.get("token")?.value;

  // If user is on the login page
  if (req.nextUrl.pathname.startsWith("/admin-login")) {
    if (token) {
      try {
        // If token is valid, redirect user to dashboard
        await verifyToken(token);
        console.log("User already logged in, redirecting to /admin-dashboard");
        return NextResponse.redirect(new URL("/admin-dashboard", req.url));
      } catch (error) {
        console.error(
          "Token invalid, allowing user to stay on /admin-login.",
          error
        );
      }
    }
    return NextResponse.next(); // Allow user to stay at the login page if no token is valid
  }

  // If user is accessing admin-dashboard without a token
  if (!token) {
    console.log("Token not found, redirecting to /admin-login.");
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  try {
    await verifyToken(token);
    console.log("Token is valid, allowing access.");
    return NextResponse.next();
  } catch (error) {
    console.error("Token invalid, redirecting to login.", error);
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }
}
