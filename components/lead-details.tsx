'use client';

import { ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

interface LeadDetailsProps {
    lead: Lead;
    onStatusChange: (leadId: string) => void;
}

export function LeadDetails({ lead, onStatusChange }: LeadDetailsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getVisaLabel = (visaId: string) => {
        const visaMap: Record<string, string> = {
            work: 'Work Visa',
            student: 'Student Visa',
            business: 'Business Visa',
            tourist: 'Tourist Visa',
            family: 'Family Visa',
        };
        return visaMap[visaId] || visaId;
    };

    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                    <CardTitle>Lead Information</CardTitle>
                    <Badge
                        variant={lead.status === 'PENDING' ? 'outline' : 'default'}
                        className='w-fit'
                    >
                        {lead.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div className='grid gap-6 md:grid-cols-2'>
                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-muted-foreground'>First Name</h3>
                        <p className='font-medium'>{lead.firstName}</p>
                    </div>

                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-muted-foreground'>Last Name</h3>
                        <p className='font-medium'>{lead.lastName}</p>
                    </div>

                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-muted-foreground'>Email</h3>
                        <p className='font-medium'>{lead.email}</p>
                    </div>

                    <div className='space-y-1'>
                        <h3 className='text-sm font-medium text-muted-foreground'>
                            LinkedIn Profile
                        </h3>
                        <p className='font-medium'>
                            <a
                                href={lead.linkedinProfile}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center text-primary hover:underline'
                            >
                                {lead.linkedinProfile}
                                <ExternalLinkIcon className='ml-1 h-3 w-3' />
                            </a>
                        </p>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className='mb-3 text-sm font-medium text-muted-foreground'>
                        Visas of Interest
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                        {lead.visasOfInterest.map(visa => (
                            <Badge key={visa} variant='secondary'>
                                {getVisaLabel(visa)}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className='mb-2 text-sm font-medium text-muted-foreground'>Resume/CV</h3>
                    <p className='text-sm'>{lead.resumeFilename}</p>
                    <p className='mt-1 text-xs text-muted-foreground'>
                        (File preview not available in this demo)
                    </p>
                </div>

                {lead.additionalInfo && (
                    <>
                        <Separator />
                        <div>
                            <h3 className='mb-2 text-sm font-medium text-muted-foreground'>
                                Additional Information
                            </h3>
                            <p className='whitespace-pre-wrap text-sm'>{lead.additionalInfo}</p>
                        </div>
                    </>
                )}

                <Separator />

                <div>
                    <h3 className='mb-2 text-sm font-medium text-muted-foreground'>
                        Submission Date
                    </h3>
                    <p className='text-sm'>{formatDate(lead.createdAt)}</p>
                </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
                {lead.status === 'PENDING' && (
                    <Button onClick={() => onStatusChange(lead.id)}>Mark as Reached Out</Button>
                )}
                {lead.status === 'REACHED_OUT' && (
                    <Button variant='outline' disabled>
                        Already Reached Out
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
