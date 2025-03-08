import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { statuses } from '@/constants/statuses';
import { LeadProps } from '@/types/leads';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formSchema, SchemaType } from './form.schema';

const UpdateLeadDialog = ({
    lead,
    openDialog,
    setOpenDialog,
    fetchData,
}: {
    lead: LeadProps | undefined;
    openDialog: boolean;
    setOpenDialog: (openDialog: boolean) => void;
    fetchData: () => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    const onSubmit = async (values: SchemaType) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/leads', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: lead?.id,
                    status: values.status,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Succesfully updated');
                setOpenDialog(false);
                fetchData();
            } else {
                toast.error(result.error || 'An Error Occured');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Update status</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-x-2'>
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
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
                        <Button
                            type='submit'
                            className='w-full mt-5'
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Save changes
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateLeadDialog;
