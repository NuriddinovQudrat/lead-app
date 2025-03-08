'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
    const router = useRouter();

    // Check if already logged in
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            router.push('/dashboard');
        }
    }, [router]);

    return (
        <div className='flex min-h-screen flex-col'>
            <main className='flex flex-1 items-center justify-center p-6'>
                <div className='w-full max-w-md'>
                    <LoginForm />
                </div>
            </main>
        </div>
    );
}
