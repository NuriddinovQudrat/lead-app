'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const visaOptions = [
    { id: 'work', label: 'Work Visa' },
    { id: 'student', label: 'Student Visa' },
    { id: 'business', label: 'Business Visa' },
    { id: 'tourist', label: 'Tourist Visa' },
    { id: 'family', label: 'Family Visa' },
];

export function LeadSubmissionForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        linkedinProfile: '',
        visasOfInterest: [] as string[],
        additionalInfo: '',
    });
    const [errors, setErrors] = useState({} as Record<string, string>);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.linkedinProfile.trim()) {
            newErrors.linkedinProfile = 'LinkedIn profile is required';
        } else if (!formData.linkedinProfile.includes('linkedin.com')) {
            newErrors.linkedinProfile = 'Please enter a valid LinkedIn URL';
        }

        if (formData.visasOfInterest.length === 0) {
            newErrors.visasOfInterest = 'Please select at least one visa type';
        }

        if (!selectedFile) {
            newErrors.resume = 'Please upload your resume/CV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            visasOfInterest: checked
                ? [...prev.visasOfInterest, id]
                : prev.visasOfInterest.filter(item => item !== id),
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store in localStorage for demo purposes
            const leads = JSON.parse(localStorage.getItem('leads') || '[]');
            leads.push({
                id: Date.now().toString(),
                ...formData,
                resumeFilename: selectedFile?.name || '',
                status: 'PENDING',
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem('leads', JSON.stringify(leads));

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>Thank You!</CardTitle>
                    <CardDescription className='text-center'>
                        Your information has been submitted successfully.
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-center space-y-4 pt-6'>
                    <div className='rounded-full bg-green-100 p-3'>
                        <CheckIcon className='h-8 w-8 text-green-600' />
                    </div>
                    <p className='text-center'>
                        We have received your submission and our team will review it shortly. You
                        will be contacted via the email address you provided.
                    </p>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <Button onClick={() => router.push('/')} variant='outline'>
                        Return to Home
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Lead Submission Form</CardTitle>
                <CardDescription>
                    Please fill out all required fields to submit your information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label htmlFor='firstName'>First Name *</Label>
                            <Input
                                id='firstName'
                                name='firstName'
                                placeholder='John'
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            {errors.firstName && (
                                <p className='text-sm text-red-500'>{errors.firstName}</p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='lastName'>Last Name *</Label>
                            <Input
                                id='lastName'
                                name='lastName'
                                placeholder='Doe'
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            {errors.lastName && (
                                <p className='text-sm text-red-500'>{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email *</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='john.doe@example.com'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='linkedinProfile'>LinkedIn Profile *</Label>
                        <Input
                            id='linkedinProfile'
                            name='linkedinProfile'
                            placeholder='https://linkedin.com/in/johndoe'
                            value={formData.linkedinProfile}
                            onChange={handleInputChange}
                        />
                        {errors.linkedinProfile && (
                            <p className='text-sm text-red-500'>{errors.linkedinProfile}</p>
                        )}
                    </div>

                    <div className='space-y-3'>
                        <div>
                            <Label>Visas of Interest *</Label>
                            <p className='text-sm text-muted-foreground'>
                                Select all visa types you are interested in.
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                            {visaOptions.map(option => (
                                <div key={option.id} className='flex items-center space-x-2'>
                                    <Checkbox
                                        id={option.id}
                                        checked={formData.visasOfInterest.includes(option.id)}
                                        onCheckedChange={checked =>
                                            handleCheckboxChange(option.id, checked as boolean)
                                        }
                                    />
                                    <Label htmlFor={option.id} className='font-normal'>
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.visasOfInterest && (
                            <p className='text-sm text-red-500'>{errors.visasOfInterest}</p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='resume'>Resume/CV Upload *</Label>
                        <Input
                            id='resume'
                            type='file'
                            accept='.pdf,.doc,.docx'
                            onChange={handleFileChange}
                        />
                        <p className='text-sm text-muted-foreground'>
                            Please upload your resume in PDF or Word format.
                        </p>
                        {errors.resume && <p className='text-sm text-red-500'>{errors.resume}</p>}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='additionalInfo'>Additional Information</Label>
                        <Textarea
                            id='additionalInfo'
                            name='additionalInfo'
                            placeholder='Please provide any additional information that might be relevant to your application.'
                            className='min-h-[120px]'
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                        />
                        <p className='text-sm text-muted-foreground'>
                            Optional: Share any additional details that might be relevant.
                        </p>
                    </div>

                    <Button type='submit' className='w-full' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Submitting...
                            </>
                        ) : (
                            'Submit Application'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
