import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema, SchemaType } from './form.schema';

export const usePage = () => {
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
        console.log(values);
    };

    return { form, onSubmit };
};
