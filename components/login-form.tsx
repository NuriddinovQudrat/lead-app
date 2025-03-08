'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Set default credentials
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'test@gmail.com',
            password: '12345678',
        },
    });

    // Check if already logged in
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            router.push('/dashboard');
        }
    }, [router]);

    async function onSubmit(data: FormValues) {
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, accept any login with valid format
            // In a real app, you would validate credentials against your backend
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify({ email: data.email }));

            // Navigate to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            form.setError('root', {
                message: 'Login failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className='w-full'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl'>Admin Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access the lead management dashboard
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='admin@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='••••••' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.formState.errors.root && (
                            <p className='text-sm font-medium text-destructive'>
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className='flex flex-col gap-2 text-center'>
                <p className='text-sm text-muted-foreground'>
                    Default credentials are pre-filled for demo purposes
                </p>
                <p className='text-xs text-muted-foreground'>
                    Email: test@gmail.com | Password: 12345678
                </p>
            </CardFooter>
        </Card>
    );
}
