import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function ThankYouPage() {
    return (
        <div className='flex lg:w-2xl mx-auto min-h-screen flex-col items-center justify-center text-center p-5 gap-5'>
            <Image src={'/icons/favorite.png'} alt='' width={80} height={80} className='mx-auto' />

            <h1 className='text-2xl font-bold'>Thank You</h1>
            <p className='text-xl font-semibold'>
                Your information was submitted to our team of immigration attorneys. Expect an email
                from hello@tryalma.ai.
            </p>

            <Link href='/'>
                <Button className='cursor-pointer px-10'>Go Back to Homepage</Button>
            </Link>
        </div>
    );
}
