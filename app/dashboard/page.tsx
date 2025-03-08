import { LeadManagementDashboard } from '@/components/lead-management-dashboard';

export default function DashboardPage() {
    return (
        <div className='space-y-6'>
            <h1 className='text-2xl font-semibold'>Leads</h1>
            <LeadManagementDashboard />
        </div>
    );
}
