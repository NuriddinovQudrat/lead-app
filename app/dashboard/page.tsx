import { LeadManagementDashboard } from '@/components/lead-management-dashboard';

export default function DashboardPage() {
    return (
        <div className='flex min-h-screen flex-col mx-auto container'>
            <header className='border-b py-4'>
                <div className='container'>
                    <h1 className='text-2xl font-bold'>Lead Management Dashboard</h1>
                </div>
            </header>

            <main className='container flex-1 py-8'>
                <LeadManagementDashboard />
            </main>

            <footer className='border-t py-4'>
                <div className='container text-center text-sm text-muted-foreground'>
                    &copy; {new Date().getFullYear()} Lead Management System. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
