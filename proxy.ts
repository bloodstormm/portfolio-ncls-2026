import createMiddleware from "next-intl/middleware";
import { routing } from "./app/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /admin (keep without locale prefix)
    // - all root files inside /public (e.g. /favicon.ico)
    "/((?!api|_next|admin|.*\\..*).*)",
  ],
};
