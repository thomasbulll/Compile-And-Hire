import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT,
} from "@/routes"

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const nextPathName = nextUrl.pathname;
    const isApiAuthRoute = nextPathName.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextPathName);
    const isAuthRoute = authRoutes.includes(nextPathName);

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

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
});

// Avoids invoking middleware on undesirable urls
// e.g. next static files, next images etc.
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
