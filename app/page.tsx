import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className='flex min-h-screen flex-col'>
            <header className='bg-primary py-6'>
                <div className='container flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-white'>Lead Management System</h1>
                    <Link href='/login'>
                        <Button variant='secondary'>Admin Login</Button>
                    </Link>
                </div>
            </header>

            <main className='container flex-1 py-12'>
                <div className='mx-auto max-w-3xl space-y-6 text-center'>
                    <h2 className='text-3xl font-bold tracking-tight'>Submit Your Information</h2>
                    <p className='text-muted-foreground'>
                        Please fill out the form below to express your interest. Our team will reach
                        out to you shortly.
                    </p>
                    <div className='mt-8'>
                        <Link href='/submit'>
                            <Button size='lg' className='px-8'>
                                Submit Your Application
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className='border-t py-6'>
                <div className='container text-center text-sm text-muted-foreground'>
                    &copy; {new Date().getFullYear()} Lead Management System. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
