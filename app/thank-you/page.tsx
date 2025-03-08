import Link from 'next/link';
import { FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 text-center'>
            <FileIcon className='mb-6 h-16 w-16 text-indigo-400' />

            <h1 className='mb-3 text-2xl font-semibold'>Thank You</h1>

            <p className='mb-8 max-w-md text-muted-foreground'>
                Your information was submitted to our team of immigration attorneys. Expect an email
                from hello@tryalma.ai.
            </p>

            <Link href='/'>
                <Button className='bg-black text-white hover:bg-black/90'>
                    Go Back to Homepage
                </Button>
            </Link>
        </div>
    );
}
