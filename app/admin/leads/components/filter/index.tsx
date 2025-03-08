import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { SchemaType } from '../../form.schema';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { statuses } from '@/constants/statuses';

const Filter = () => {
    const form = useFormContext<SchemaType>();

    return (
        <Form {...form}>
            <form className='flex gap-4'>
                <FormField
                    control={form.control}
                    name='search'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder='Search' {...field} className='sm:w-72' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className='sm:w-72'>
                                        <SelectValue placeholder='Select a status' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {statuses.map(status => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default Filter;
