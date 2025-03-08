import { useDebounce } from '@/hooks/use-debounces';
import { LeadProps } from '@/types/leads';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema, SchemaType } from './form.schema';

export const usePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<LeadProps[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);

    const form = useForm<SchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            status: 'all',
        },
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/leads', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setData(result?.leads);
            }
        } catch (error) {
            setError(error as AxiosError);
        } finally {
            setIsLoading(false);
        }
    };

    const search = useDebounce(form.watch('search'));

    useEffect(() => {
        fetchData();
    }, []);

    return { form, isLoading, error, data, fetchData };
};
