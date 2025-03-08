'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FileIcon, HeartIcon, ScrollIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'India',
    'China',
    'Germany',
    'France',
    // Add more countries as needed
];

const formSchema = z.object({
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    countryOfCitizenship: z
        .string()
        .min(1, { message: 'Please select your country of citizenship' }),
    linkedinProfile: z.string().url({ message: 'Please enter a valid URL' }).optional(),
    visaCategory: z.enum(['O-1', 'EB-1A', 'EB-2-NIW', 'not-sure'], {
        required_error: 'Please select a visa category',
    }),
    additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadSubmissionForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            countryOfCitizenship: '',
            linkedinProfile: '',
            additionalInfo: '',
        },
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store in localStorage for demo purposes
            const leads = JSON.parse(localStorage.getItem('leads') || '[]');
            leads.push({
                id: Date.now().toString(),
                ...data,
                status: 'PENDING',
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem('leads', JSON.stringify(leads));

            router.push('/thank-you');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12'>
                <div className='space-y-8'>
                    <div className='flex items-center gap-3'>
                        <ScrollIcon className='h-12 w-12 text-indigo-400' />
                        <div>
                            <h3 className='text-lg font-medium'>
                                Want to understand your visa options?
                            </h3>
                            <p className='text-muted-foreground'>
                                Submit the form below and our team of experienced attorneys will
                                review your information and send a preliminary assessment of your
                                case based on your goals.
                            </p>
                        </div>
                    </div>

                    <div className='grid gap-4'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='First Name'
                                                className='border-0 bg-white/80'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='Last Name'
                                                className='border-0 bg-white/80'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder='Email'
                                            className='border-0 bg-white/80'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='countryOfCitizenship'
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='border-0 bg-white/80'>
                                                <SelectValue placeholder='Country of Citizenship' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {countries.map(country => (
                                                <SelectItem key={country} value={country}>
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='linkedinProfile'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder='LinkedIn / Personal Website URL'
                                            className='border-0 bg-white/80'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className='space-y-8'>
                    <div className='flex items-center gap-3'>
                        <FileIcon className='h-12 w-12 text-indigo-400' />
                        <div>
                            <h3 className='text-lg font-medium'>Visa categories of interest?</h3>
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name='visaCategory'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className='grid gap-3'
                                    >
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem value='O-1' id='O-1' />
                                            <FormLabel htmlFor='O-1' className='font-normal'>
                                                O-1
                                            </FormLabel>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem value='EB-1A' id='EB-1A' />
                                            <FormLabel htmlFor='EB-1A' className='font-normal'>
                                                EB-1A
                                            </FormLabel>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem value='EB-2-NIW' id='EB-2-NIW' />
                                            <FormLabel htmlFor='EB-2-NIW' className='font-normal'>
                                                EB-2 NIW
                                            </FormLabel>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem value='not-sure' id='not-sure' />
                                            <FormLabel htmlFor='not-sure' className='font-normal'>
                                                I don't know
                                            </FormLabel>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className='space-y-8'>
                    <div className='flex items-center gap-3'>
                        <HeartIcon className='h-12 w-12 text-indigo-400' />
                        <div>
                            <h3 className='text-lg font-medium'>How can we help you?</h3>
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name='additionalInfo'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder='What is your current status and when does it expire? What is your past immigration history? Are you looking for an immediate solution? If not, for how long can you wait? Are there any timeline considerations?'
                                        className='min-h-[150px] border-0 bg-white/80'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type='submit'
                    className='w-full bg-black text-white hover:bg-black/90'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
}
