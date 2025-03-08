import { cookies } from 'next/headers';

export function isAuthenticated() {
    const cookieStore = cookies();
    return cookieStore.has('auth');
}

export async function login(email: string, password: string) {
    cookies().set('auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
    });

    return true;
}

export async function logout() {
    cookies().delete('auth');
}
