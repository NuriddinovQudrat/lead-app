import Link from 'next/link';
import { FileText, Settings } from 'lucide-react';

export function Sidebar() {
    return (
        <div className='flex w-60 flex-col border-r bg-white'>
            <div className='p-6'>
                <h1 className='text-2xl font-medium'>almā</h1>
            </div>

            <nav className='flex-1 space-y-1 px-3'>
                <Link
                    href='/dashboard'
                    className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100'
                >
                    <FileText className='h-4 w-4' />
                    Leads
                </Link>
                <Link
                    href='/dashboard/settings'
                    className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                >
                    <Settings className='h-4 w-4' />
                    Settings
                </Link>
            </nav>

            <div className='border-t p-4'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium'>
                        A
                    </div>
                    <div className='text-sm font-medium'>Admin</div>
                </div>
            </div>
        </div>
    );
}
