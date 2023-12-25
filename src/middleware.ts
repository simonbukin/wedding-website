import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: (req) => req.url !== "/admin",
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId === process.env.VITE_ADMIN_ID &&
      req.nextUrl.pathname === "/admin"
    ) {
      return NextResponse.next();
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (
      auth.userId &&
      !auth.isPublicRoute &&
      req.nextUrl.pathname !== "/admin"
    ) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
