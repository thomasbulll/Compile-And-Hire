/**
 * An array of routes that are accessible to anyone not logged in
 */
export const publicRoutes = [
    "/",
    "/why-us",
    "/about",
    "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication
 */
export const authRoutes = [
    "/auth/login",
    "/auth/student-register",
    "/auth/business-register",
    "/auth/choose-register-type",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/**
 * An array of routes that are used by businesses
 */
export const businessRoutes = [
    "/post/edit-post",
    "/post/my-posts",
    "/post/new-post",
]

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API
 * authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path post login
 */
export const DEFAULT_STUDENT_LOGIN_REDIRECT = "/settings/student-profile";

export const DEFAULT_BUSINESS_LOGIN_REDIRECT = "/settings/business-profile";

export const DEFAULT_NON_LOGGED_IN_REDIRECT = "/";

