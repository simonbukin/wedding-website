import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: (req) => !req.url.includes("/admin"),
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (!auth.isPublicRoute && auth.orgSlug !== process.env.VITE_ORG_SLUG) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
