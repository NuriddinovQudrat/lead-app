'use client';

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
import { usePage } from './use-page';

export default function LoginPage() {
    const { form, onSubmit, isLoading } = usePage();

    return (
        <div className='flex min-h-screen justify-center items-center'>
            <Card className='w-96 rounded-md'>
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
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Username' {...field} />
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
                                            <Input
                                                type='password'
                                                placeholder='••••••'
                                                {...field}
                                            />
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
                            <Button
                                type='submit'
                                className='w-full'
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Log in
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex flex-col gap-2 text-center'>
                    <p className='text-sm text-muted-foreground'>
                        Default credentials are pre-filled for demo purposes
                    </p>
                    <p className='text-xs text-muted-foreground'>
                        Username: qudrat | Password: 12345678
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
