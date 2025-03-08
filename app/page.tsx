import { LeadSubmissionForm } from '@/components/lead-submission-form';
import Image from 'next/image';

export default function Home() {
    return (
        <div className='min-h-screen bg-[#e8ecd6]'>
            <div className='container relative mx-auto px-4 py-8'>
                {/* Logo */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-medium'>almā</h1>
                </div>

                {/* Decorative Circles */}
                <div className='absolute left-0 top-0 -z-10'>
                    <Image
                        src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-08%20at%2011.28.59-xLdOCTn3IH13vjPCYBxqgPx8rYwRYa.png'
                        alt='Decorative circles'
                        width={300}
                        height={300}
                        className='object-contain'
                    />
                </div>

                {/* Main Content */}
                <div className='mx-auto max-w-3xl'>
                    <h2 className='mb-16 text-5xl font-bold leading-tight'>
                        Get An Assessment
                        <br />
                        Of Your Immigration Case
                    </h2>

                    <LeadSubmissionForm />
                </div>
            </div>
        </div>
    );
}
