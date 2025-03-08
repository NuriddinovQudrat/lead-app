'use client';

import Filter from './components/filter';
import { FormProvider } from 'react-hook-form';
import { usePage } from './use-page';
import LeadsTable from './components/leads-table';

const Leads = () => {
    const { form, isLoading, data, error } = usePage();

    return (
        <FormProvider {...form}>
            <div className='grid gap-4'>
                <h1 className='text-2xl font-bold'>Leads</h1>
                <Filter />
                <LeadsTable isLoading={isLoading} data={data} error={error} />
            </div>
        </FormProvider>
    );
};

export default Leads;
