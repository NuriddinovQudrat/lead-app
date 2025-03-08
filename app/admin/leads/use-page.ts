import { useForm } from 'react-hook-form';
import { formSchema, SchemaType } from './form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@/hooks/use-debounces';

export const usePage = () => {
    const form = useForm<SchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            status: 'all',
        },
    });

    const search = useDebounce(form.watch('search'));

    return { form };
};
