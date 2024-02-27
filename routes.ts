/**
 * An array of routes that are accessible to the public
 * Theses routes don't require authentication
 * @Type {sting[]}
 */

export const publicRoute = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * Theses routes will redirect login user to the "/settings"
 * @Type {sting[]}
 */

export const authenticationRoute = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with prefix are used for API authentication Purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * Only Admin are allowed
 * @type {string}
 */

export const ADMIN_ONLY = "/admin";

/**
 * Admin Emails
 * @type {string[]}
 */

export const adminEmails = ["monerulmd5@gmail.com"];

/**
 * The Default Redirect  Path for logging
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
