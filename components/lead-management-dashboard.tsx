'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, LogOutIcon, SearchIcon, UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { LeadDetails } from '@/components/lead-details';

type Lead = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    linkedinProfile: string;
    visasOfInterest: string[];
    resumeFilename: string;
    additionalInfo: string;
    status: 'PENDING' | 'REACHED_OUT';
    createdAt: string;
};

export function LeadManagementDashboard() {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Authentication check
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus !== 'true') {
            router.push('/login');
        } else {
            setIsAuthenticated(true);

            // Load leads from localStorage for demo
            const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]');
            setLeads(storedLeads);
            setFilteredLeads(storedLeads);
        }
    }, [router]);

    // Filter leads when search query changes
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredLeads(leads);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = leads.filter(
                lead =>
                    lead.firstName.toLowerCase().includes(query) ||
                    lead.lastName.toLowerCase().includes(query) ||
                    lead.email.toLowerCase().includes(query),
            );
            setFilteredLeads(filtered);
        }
    }, [searchQuery, leads]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleStatusChange = (leadId: string) => {
        const updatedLeads = leads.map(lead =>
            lead.id === leadId ? { ...lead, status: 'REACHED_OUT' as const } : lead,
        );

        setLeads(updatedLeads);
        setFilteredLeads(
            filteredLeads.map(lead =>
                lead.id === leadId ? { ...lead, status: 'REACHED_OUT' as const } : lead,
            ),
        );

        // Update localStorage for demo
        localStorage.setItem('leads', JSON.stringify(updatedLeads));

        // If the selected lead is the one being updated, update it too
        if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead({ ...selectedLead, status: 'REACHED_OUT' });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (!isAuthenticated) {
        return null; // Don't render anything while checking authentication
    }

    if (selectedLead) {
        return (
            <div className='space-y-6'>
                <div className='flex items-center'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => setSelectedLead(null)}
                        className='mr-2'
                    >
                        Back to List
                    </Button>
                    <h2 className='text-xl font-semibold'>
                        Lead Details: {selectedLead.firstName} {selectedLead.lastName}
                    </h2>
                </div>

                <LeadDetails lead={selectedLead} onStatusChange={handleStatusChange} />
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Lead Management</h2>
                    <p className='text-muted-foreground'>View and manage all submitted leads</p>
                </div>
                <Button variant='outline' size='sm' onClick={handleLogout}>
                    <LogOutIcon className='mr-2 h-4 w-4' />
                    Logout
                </Button>
            </div>

            <div className='flex items-center gap-4'>
                <div className='relative flex-1'>
                    <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Search leads by name or email...'
                        className='pl-8'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Leads</CardTitle>
                    <CardDescription>
                        {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredLeads.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-12 text-center'>
                            <UserIcon className='mb-4 h-12 w-12 text-muted-foreground/60' />
                            <h3 className='text-lg font-semibold'>No leads found</h3>
                            <p className='text-muted-foreground'>
                                {leads.length === 0
                                    ? 'No leads have been submitted yet.'
                                    : 'No leads match your search criteria.'}
                            </p>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Submission Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className='text-right'>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredLeads.map(lead => (
                                        <TableRow key={lead.id}>
                                            <TableCell className='font-medium'>
                                                {lead.firstName} {lead.lastName}
                                            </TableCell>
                                            <TableCell>{lead.email}</TableCell>
                                            <TableCell>{formatDate(lead.createdAt)}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        lead.status === 'PENDING'
                                                            ? 'outline'
                                                            : 'default'
                                                    }
                                                >
                                                    {lead.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    onClick={() => setSelectedLead(lead)}
                                                >
                                                    View Details
                                                    <ArrowRightIcon className='ml-2 h-4 w-4' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
