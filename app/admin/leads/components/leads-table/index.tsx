import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
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
import { setUTCTime } from '@/utils/date';
import { AxiosError } from 'axios';
import { Edit } from 'lucide-react';
import UpdateLeadDialog from '../update-lead-dialog';
import { useState } from 'react';

interface LeadsTableProps {
    isLoading: boolean;
    error: AxiosError | null;
    data: LeadProps[];
    fetchData: () => void;
}

const LeadsTable = (props: LeadsTableProps) => {
    const { isLoading, error, data, fetchData } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [updatedLead, setUpdatedLead] = useState<LeadProps>();

    const open = (item: LeadProps) => {
        setOpenDialog(true);
        setUpdatedLead(item);
    };

    return (
        <div className='overflow-scroll'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-32'>Fullname</TableHead>
                        <TableHead className='w-32'>Email</TableHead>
                        <TableHead className='w-32'>Linkedin</TableHead>
                        <TableHead className='w-10'>Visa</TableHead>
                        <TableHead className='w-32'>Status</TableHead>
                        <TableHead className='w-32'>Citizenship</TableHead>
                        <TableHead className='w-32'>Additional</TableHead>
                        <TableHead className='w-32'>Submitted at</TableHead>
                        <TableCell className='w-32'>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={9}>
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
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.linkedin}</TableCell>
                                    <TableCell>
                                        <ul>
                                            {item.visas?.map((visa: string) => (
                                                <li key={visa}>{visa}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.citizenship}</TableCell>
                                    <TableCell>{item.additional}</TableCell>
                                    <TableCell>{setUTCTime(item.created_at)}</TableCell>
                                    <TableCell>
                                        <Button
                                            size={'icon'}
                                            variant={'outline'}
                                            onClick={() => open(item)}
                                        >
                                            <Edit />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className='text-center'>
                                <span className='text-muted-foreground'>No Data</span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <UpdateLeadDialog
                lead={updatedLead}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                fetchData={fetchData}
            />
        </div>
    );
};

export default LeadsTable;
