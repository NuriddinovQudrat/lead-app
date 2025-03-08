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

const LeadsTable = () => {
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
                    {false ? (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Loader className='h-auto' />
                            </TableCell>
                        </TableRow>
                    ) : leadsList.length > 0 ? (
                        leadsList?.map(item => {
                            return (
                                <TableRow key={item?.id}>
                                    <TableCell>
                                        {item.first_name} {item.last_name}
                                    </TableCell>
                                    <TableCell>{item.submitted_at}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.country}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <span className='text-muted-foreground'>Ma'lumot mavjud emas</span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default LeadsTable;
