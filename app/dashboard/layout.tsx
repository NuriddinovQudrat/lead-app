import type React from 'react';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <main className='flex-1 overflow-y-auto'>
                <div className='container py-8'>{children}</div>
            </main>
        </div>
    );
}
