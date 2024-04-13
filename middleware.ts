import authConfig from "@/auth.config"
import NextAuth from "next-auth"

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log("ROUTE: ", req.nextUrl.pathname)
    console.log(isLoggedIn);
});

// Avoids invoking middleware on undesirable urls
// e.g. next static files, next images etc.
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
