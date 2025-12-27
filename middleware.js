import { NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/generate-logo'];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // For protected routes, we'll handle auth check on the client side
    // since Firebase Auth state is managed client-side
    // The middleware just passes through - actual protection happens in components

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};