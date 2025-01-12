import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/create', '/course(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // If the route is protected, ensure the user is authenticated
    if (isProtectedRoute(req)) {
        await auth.protect(); // Redirects to sign-in if not authenticated
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always apply for API routes
        '/(api|trpc)(.*)',
    ],
};
