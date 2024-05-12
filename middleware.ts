import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    businessRoutes,
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_NON_LOGGED_IN_REDIRECT
} from "@/routes"
import { useCurrentUser } from "./hooks/use-current-user";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const nextPathName = nextUrl.pathname;
    const isApiAuthRoute = nextPathName.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextPathName);
    const isAuthRoute = authRoutes.includes(nextPathName);
    const isBusinessRoute = businessRoutes.includes(nextPathName);

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn){
            return Response.redirect(new URL
                (DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (isBusinessRoute){
        if (!isLoggedIn){
            return Response.redirect(new URL
                (DEFAULT_NON_LOGGED_IN_REDIRECT, nextUrl))
        }
        
        //TODO: If account is not a business account, redirect.

        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)
        return Response.redirect(new URL(
            `/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl
        ));
    }
});

// Avoids invoking middleware on undesirable urls
// e.g. next static files, next images etc.
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
