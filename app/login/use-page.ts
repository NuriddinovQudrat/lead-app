import { ROUTER } from '@/constants/router';
import { useUserStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formSchema, SchemaType } from './form.schema';
import { useState } from 'react';

export const usePage = () => {
    const setStoreUser = useUserStore(state => state.setUser);
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: SchemaType) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                setStoreUser(result);
                router.push(ROUTER.ADMIN);
                toast.success('Succesfully logged in!');
            } else {
                toast.error(result.error || 'Login failed');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { form, onSubmit, isLoading };
};
