'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { countries } from '@/constants/countries';
import { visaOptions } from '@/constants/visa-options';
import Image from 'next/image';
import { usePage } from './use-page';
import { LogInIcon } from 'lucide-react';

export default function Home() {
    const { form, onSubmit } = usePage();

    return (
        <div className='min-h-screen container mx-auto p-5'>
            <div className='text-right'>
                <Button className='text-xs'>
                    <LogInIcon /> Admin
                </Button>
            </div>
            <div className='text-center py-20'>
                <h2 className='lg:text-4xl text-2xl font-bold'>
                    Get An Assesment Of Your Immigration Case
                </h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='lg:w-2xl mx-auto grid gap-10'>
                        <div className='text-center grid gap-5'>
                            <Image
                                src={'/icons/warning-sign.png'}
                                alt=''
                                width={80}
                                height={80}
                                className='mx-auto'
                            />
                            <h1 className='text-2xl font-bold'>
                                Want to understand your visa options?
                            </h1>
                            <p className='text-xl font-semibold'>
                                Submit the form below and our team of experienced attorneys will
                                review your information and send a preliminary assessment of your
                                case based on your goals.
                            </p>
                            <FormField
                                control={form.control}
                                name='first_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='First Name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='last_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Last Name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Email' type='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='citizenship'
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='linkedin'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='LinkedIn / Personal Website URL'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='text-center grid gap-5'>
                            <Image
                                src={'/icons/categories.png'}
                                alt=''
                                width={80}
                                height={80}
                                className='mx-auto'
                            />
                            <h1 className='text-2xl font-bold'>Visa categories of interest?</h1>
                            <FormField
                                control={form.control}
                                name='visas'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid gap-2'>
                                            {visaOptions.map(visa => (
                                                <FormItem
                                                    key={visa}
                                                    className='flex items-center space-x-2'
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value.includes(visa)}
                                                            onCheckedChange={checked => {
                                                                field.onChange(
                                                                    checked
                                                                        ? [...field.value, visa]
                                                                        : field.value.filter(
                                                                              v => v !== visa,
                                                                          ),
                                                                );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className='cursor-pointer'>
                                                        {visa}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='text-center grid gap-5'>
                            <Image
                                src={'/icons/peace.png'}
                                alt=''
                                width={80}
                                height={80}
                                className='mx-auto'
                            />
                            <h1 className='text-2xl font-bold'>How can we help you?</h1>
                            <FormField
                                control={form.control}
                                name='additional'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder='What is your current status and when does it expire? What is your past immigration history? Are you looking for an immediate solution? If not, for how long can you wait? Are there any timeline considerations?'
                                                className='min-h-[150px]'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button size={'lg'} type='submit' className='w-full cursor-pointer'>
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
