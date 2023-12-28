import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: (req) => req.url !== "/admin",
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId === process.env.VITE_ADMIN_ID &&
      req.nextUrl.pathname === "/admin"
    ) {
      return NextResponse.next();
    }

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
