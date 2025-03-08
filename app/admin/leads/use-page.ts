import { useForm } from 'react-hook-form';
import { formSchema, SchemaType } from './form.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const usePage = () => {
    const form = useForm<SchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            status: 'all',
        },
    });

    return { form };
};
