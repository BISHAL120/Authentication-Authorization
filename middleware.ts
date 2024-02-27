import authConfig from "@/auth.config";

import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authenticationRoute,
  publicRoute,
  ADMIN_ONLY,
  adminEmails,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const adminOnly = nextUrl.pathname.startsWith(ADMIN_ONLY);
  const isAuthRoute = authenticationRoute.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (adminOnly) {
    const adminCheck = adminEmails.includes(req.auth?.user?.email as string);
    if (!adminCheck) {
      return Response.redirect(new URL("client", nextUrl));
    }
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
