import { ROUTER } from '@/constants/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formSchema, SchemaType } from './form.schema';

export const usePage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            linkedin: '',
            additional: '',
            visas: [],
        },
    });

    const onSubmit = async (values: SchemaType) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                router.push(ROUTER.THANK_YOU);
            } else {
                toast.error(result.error || 'An Error Occured');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { form, onSubmit, isLoading };
};
