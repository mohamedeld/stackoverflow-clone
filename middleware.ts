import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favourite(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectRoute(req)) {
    const user = await auth();

    // Check if the user is authenticated
    if (!user) {
      // Handle unauthenticated access (e.g., redirect to login)
      return new Response('Unauthorized', { status: 401 });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};