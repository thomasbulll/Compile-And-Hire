/**
 * An array of routes that are accessible to anyone not logged in
 */
export const publicRoutes = [
    "/",
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
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API
 * authentication purposes
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path post login
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings/profile"
