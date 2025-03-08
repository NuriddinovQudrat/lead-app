'use client';

import Filter from './components/filter';
import { FormProvider } from 'react-hook-form';
import { usePage } from './use-page';
import LeadsTable from './components/leads-table';

const Leads = () => {
    const { form } = usePage();

    return (
        <FormProvider {...form}>
            <div className='grid gap-2'>
                <h1 className='text-2xl font-bold'>Leads</h1>
                <Filter />
                <LeadsTable />
            </div>
        </FormProvider>
    );
};

export default Leads;
