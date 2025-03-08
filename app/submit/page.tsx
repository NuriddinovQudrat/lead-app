import { LeadSubmissionForm } from '@/components/lead-submission-form';

export default function SubmitPage() {
    return (
        <div className='flex min-h-screen flex-col'>
            <header className='bg-primary py-6'>
                <div className='container'>
                    <h1 className='text-2xl font-bold text-white'>Lead Submission Form</h1>
                </div>
            </header>

            <main className='container flex-1 py-12'>
                <div className='mx-auto max-w-3xl'>
                    <LeadSubmissionForm />
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
