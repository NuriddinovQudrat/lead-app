import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isProtectedRoute = path.startsWith('/dashboard');

    // Check if the user is authenticated
    const isAuthenticated = request.cookies.has('auth');

    // If trying to access a protected route and not authenticated, redirect to login
    // if (isProtectedRoute && !isAuthenticated) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
