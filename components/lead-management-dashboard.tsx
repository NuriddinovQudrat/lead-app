'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Lead = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    status: 'Pending' | 'Reached Out';
    submittedAt: string;
};

const ITEMS_PER_PAGE = 8;

export function LeadManagementDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Lead;
        direction: 'asc' | 'desc';
    }>({ key: 'submittedAt', direction: 'desc' });

    // Mock data
    const mockLeads: Lead[] = [
        {
            id: '1',
            firstName: 'Jorge',
            lastName: 'Ruiz',
            email: 'jorge@example.com',
            country: 'Mexico',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '2',
            firstName: 'Bahar',
            lastName: 'Zamir',
            email: 'bahar@example.com',
            country: 'Mexico',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '3',
            firstName: 'Mary',
            lastName: 'Lopez',
            email: 'mary@example.com',
            country: 'Brazil',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '4',
            firstName: 'Li',
            lastName: 'Zijin',
            email: 'li@example.com',
            country: 'South Korea',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '5',
            firstName: 'Mark',
            lastName: 'Antonov',
            email: 'mark@example.com',
            country: 'Russia',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '6',
            firstName: 'Jane',
            lastName: 'Ma',
            email: 'jane@example.com',
            country: 'Mexico',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '7',
            firstName: 'Anand',
            lastName: 'Jain',
            email: 'anand@example.com',
            country: 'Mexico',
            status: 'Reached Out',
            submittedAt: '02/02/2024, 2:45 PM',
        },
        {
            id: '8',
            firstName: 'Anna',
            lastName: 'Voronova',
            email: 'anna@example.com',
            country: 'France',
            status: 'Pending',
            submittedAt: '02/02/2024, 2:45 PM',
        },
    ];

    // Filter and sort leads
    const filteredLeads = mockLeads
        .filter(lead => {
            const matchesSearch =
                `${lead.firstName} ${lead.lastName}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lead.country.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === 'all' || lead.status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    // Pagination
    const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const handleSort = (key: keyof Lead) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const SortIcon = ({ columnKey }: { columnKey: keyof Lead }) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronDown className='ml-1 h-4 w-4 text-gray-400' />;
        }
        return sortConfig.direction === 'asc' ? (
            <ChevronDown className='ml-1 h-4 w-4' />
        ) : (
            <ChevronDown className='ml-1 h-4 w-4 rotate-180 transform' />
        );
    };

    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-4'>
                <div className='relative flex-1'>
                    <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
                    <Input
                        placeholder='Search'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className='pl-9'
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All Status</SelectItem>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='reached out'>Reached Out</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='rounded-md border'>
                <div className='grid grid-cols-4 gap-4 border-b bg-gray-50/50 p-4 text-sm font-medium text-gray-500'>
                    <button onClick={() => handleSort('lastName')} className='flex items-center'>
                        Name
                        <SortIcon columnKey='lastName' />
                    </button>
                    <button onClick={() => handleSort('submittedAt')} className='flex items-center'>
                        Submitted
                        <SortIcon columnKey='submittedAt' />
                    </button>
                    <button onClick={() => handleSort('status')} className='flex items-center'>
                        Status
                        <SortIcon columnKey='status' />
                    </button>
                    <button onClick={() => handleSort('country')} className='flex items-center'>
                        Country
                        <SortIcon columnKey='country' />
                    </button>
                </div>

                <div className='divide-y'>
                    {paginatedLeads.map(lead => (
                        <div
                            key={lead.id}
                            className='grid grid-cols-4 gap-4 p-4 text-sm hover:bg-gray-50'
                        >
                            <div>
                                {lead.firstName} {lead.lastName}
                            </div>
                            <div>{lead.submittedAt}</div>
                            <div>{lead.status}</div>
                            <div>{lead.country}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex items-center justify-end gap-2'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
}
