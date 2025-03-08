import { Loader } from '@/components/shared/loader';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { leadsList } from '@/public/data/leads-list';
import { LeadProps } from '@/types/leads';
import { AxiosError } from 'axios';

interface LeadsTableProps {
    isLoading: boolean;
    error: AxiosError | null;
    data: LeadProps[];
}

const LeadsTable = (props: LeadsTableProps) => {
    const { isLoading, error, data } = props;

    return (
        <div className='overflow-scroll'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-32'>Name</TableHead>
                        <TableHead className='w-32'>Submitted</TableHead>
                        <TableHead className='w-32'>Status</TableHead>
                        <TableHead className='w-32'>Country</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Loader className='h-auto' />
                            </TableCell>
                        </TableRow>
                    ) : data.length > 0 ? (
                        data?.map(item => {
                            return (
                                <TableRow key={item?.id}>
                                    <TableCell>
                                        {item.first_name} {item.last_name}
                                    </TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.citizenship}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className='text-center'>
                                <span className='text-muted-foreground'>No data</span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default LeadsTable;
