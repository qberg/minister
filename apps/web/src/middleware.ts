import { createMiddleware, routing } from "@repo/i18n/middleware";

export default createMiddleware({
  ...routing,
  // Disable auto-detection - all users default to English
  // Users can manually switch languages via language switcher
  localeDetection: false,
});

export const config = {
  // Match all pathnames except:
  // - API routes (/api/*)
  // - Next.js internals (_next/*)
  // - Vercel internals (_vercel/*)
  // - Static files (*.png, *.jpg, etc.)
  matcher: [
    "/((?!api|trpc|_next/static|admin|_next/image|_vercel|favicon.ico|legal|.*\\..*).*)",
  ],
};
